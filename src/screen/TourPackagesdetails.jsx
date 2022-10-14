import React, { useEffect, useState } from "react";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import { useLocation, useNavigate, Link, useSearchParams } from "react-router-dom";
import { TOUR_PACKAGES_URL, TOUR_PACKAGES_RESERVE_URL } from '../constants/api'
import axios from "axios";
import moment from "moment";
import Image from '../common/Image'
import DatePicker from "react-datepicker";
import { MomentDateConvertion } from '../common/Custommethod'
import { SECRET_APP, SECRET_PASSWORD } from '../constants/config'
import { Rating } from 'react-simple-star-rating'



const TourPackagesDetails = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [tourPackage, setTourPackage] = useState({});
    const [bookingDate, setBookingDate] = useState(new Date());
    const [bookingLoader, setBookingLoader] = useState(false);

    let slug = searchParams.get('slug')
    const getTourPackageDetails = async (url) => {
        const result = await axios.get(TOUR_PACKAGES_URL + url);
        if (result.data.results.length > 0) {
            setTourPackage(result.data.results[0])
        }
    }

    const bookTourPackage = async () => {
        let data = {}
        setBookingLoader(true)
        data['booking_date'] = MomentDateConvertion(bookingDate, 'DD-MM-YYYY');
        data['user_id'] = 0
        data['guest'] = tourPackage.total_guest
        data['SECRET_KEY'] = SECRET_PASSWORD
        data['SECRET_APP'] = SECRET_APP
        data['duration'] = tourPackage.duration_from + ' days ' + tourPackage.duration_at + ' nights'
        data['tourpackage'] = tourPackage.id
        if (tourPackage.hotel !== undefined && tourPackage.hotel !== '') {
            data['hotel'] = tourPackage.hotel
        }
        // data['discount']=tourPackage.discount_amount
        data['amount'] = tourPackage.new_package_amount
        const token = localStorage.getItem('token', '');
        if (token !== '') {

            const response = await axios.post(TOUR_PACKAGES_RESERVE_URL, data, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setBookingLoader(false)
        } else {
            setBookingLoader(false)
        }


    }

    useEffect(() => {
        setTimeout(() => {
            getTourPackageDetails('?slug=' + slug)
        }, 1000);
    }, [])

    return (
        <div>
            <MobileNav />
            <nav className="bg-[#00294d]">
                <div className="hidden md:block">
                    <Nav
                        home="Home"
                        Explore="Explore"
                        Help="Help"
                    />
                </div>
            </nav>
            {Object.keys(tourPackage).length !== 0 ?
                <>
                    <div className="">
                        <Image
                            className="w-full h-96"
                            imagePath={tourPackage.tour_gallery_images[0].image}
                        />
                        {/* <img src="assets/images/image 8.png" className="w-full" alt="" /> */}
                    </div>

                    <div className="container">
                        <p className="py-2 font-semibold text-lg">Package:{tourPackage.package_name}-{tourPackage.package_code}</p>
                        <div className="grid md:grid-cols-5 gap-4">
                            <div className="col-span-3">
                                <p className="border-t-2"></p>
                                <div className="flex justify-between py-2 mx-16">
                                    <div className="flex gap-4 text-gray-600">
                                        <i class="fa-solid fa-clock mt-2 text-2xl"></i>
                                        <div>
                                            <p className="font-semibold">Duration</p>
                                            <p className="text-sm">
                                                {tourPackage.duration_from} {tourPackage.duration_from_type === 1 ? 'Days' : 'Nights'}  {tourPackage.duration_at}  {tourPackage.duration_at_type === 1 ? 'Days' : 'Nights'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-gray-600">
                                        <i class="fa-solid fa-person mt-2 text-2xl"></i>

                                        <div>
                                            <p className="font-semibold">Group Size</p>
                                            <p className="text-sm">{tourPackage.total_guest} persons</p>
                                        </div>
                                    </div>

                                </div>
                                <p className="border-b-2"></p>
                                <div className="py-3">
                                    {tourPackage.tour_gallery_images.length > 1 ?
                                        <Image
                                            className="w-full"
                                            imagePath={tourPackage.tour_gallery_images[1].image}
                                        />
                                        : null
                                    }
                                    <div className="grid grid-cols-4 gap-2 py-1">
                                        {tourPackage.tour_gallery_images.map((tourGallery, index) => (
                                            <>
                                                {index > 1 ?
                                                    <Image
                                                        className=" w-full"
                                                        imagePath={tourGallery.image}
                                                    /> : null
                                                }
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-gray-600">
                                    <h1 className="text-lg font-semibold py-2">Overview</h1>
                                    <p className="text-justify">
                                        {tourPackage.description}
                                    </p>

                                    <h1 className="text-lg font-semibold py-2">Facilities</h1>
                                    <div className="flex justify-between">

                                        {tourPackage.other_facilities !== undefined && tourPackage.other_facilities !== '' && tourPackage.other_facilities.map((facility, index) => (
                                            <div className="flex gap-2" key={index}>
                                                <i class="fa-solid fa-circle-check text-green-500"></i>
                                                <p className="text-xs ">
                                                    {facility.text}</p>
                                            </div>
                                        ))}

                                    </div>

                                    {/* <h1 className="text-lg font-semibold py-2">FAQs</h1>
                            <div className="">
                                <h1>When and where does the tour end?</h1>
                                <p className="text-justify text-sm">Your tour will conclude in San Francisco on Day 8 of the trip. There are no activities planned for this day so you're free to depart at any time. We highly recommend booking post-accommodation to give yourself time to fully experience the wonders of this iconic city! </p>
                            </div>
                            <div className="py-2">
                                <h1>When and where does the tour start?</h1>
                                <p className="text-justify text-sm">Day 1 of this tour is an arrivals day, which gives you a chance to settle into your hotel and explore nearby areas. The only planned activity for this day is an evening welcome meeting at 7pm, where you can get to know your guides and fellow travellers. Please be aware that the meeting point is subject to change until your final documents are released. </p>
                            </div>

                            <div className="py-2">
                                <h1>What is the age range?</h1>
                                <p className="text-justify text-sm">This tour has an age range of 12-60 years old, this means children under the age of 12 mayl not be eligible to participate in this tour. However, if you are over 70 years please contact us as you may be eligible to join the tour if you fill out G Adventures self-assessment form.  </p>
                            </div> */}


                                    <p className="border-t border-gray-300 pb-2"></p>
                                    {/* <h1 className="text-lg font-semibold py-2">Reviews</h1>
                            <div className="border border-gray-200 p-2 mb-2 flex justify-between">
                                <div className="grid gap-3">
                                    <div className="flex">
                                        <img src="assets/images/niraapod.jpg" alt="" className="w-20 h-20" />
                                        <div>
                                            <h1 className="font-semibold">Niaz Ahmed</h1>
                                            <p className="text-xs">16/06/2021</p>
                                            <p className="text-xs">Easy way to travel around the place.</p>
                                            <div className="text-sm">
                                                <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                                                    className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                                        className="fa-solid fa-star"></i></span>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="flex">
                                        <img src="assets/images/niraapod.jpg" alt="" className="w-20 h-20" />
                                        <div>
                                            <h1 className="font-semibold">Niaz Ahmed</h1>
                                            <p className="text-xs">16/06/2021</p>
                                            <p className="text-xs">Easy way to travel around the place.</p>
                                            <div className="text-sm">
                                                <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                                                    className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                                        className="fa-solid fa-star"></i></span>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="border-l border-gray-300 p-4 text-center flex items-center">
                                    <div>
                                        <h1 className="font-semibold">5/ <span className="text-sm">5</span></h1>
                                        <p className="font-semibold">Excellent</p>
                                        <p className="text-sm">Based on 2 <span className="font-semibold">reviews</span>  </p>
                                    </div>


                                </div>

                            </div>
                            <h1 className="font-semibold py-2">You may also like</h1>
                            <div className="md:grid gap-3 grid-cols-3 py-5">
                                <Link to="/tour-packages-details">
                                    <div
                                        className="border border-gray-100 shadow-xl rounded  transition hover:shadow-md group-hover:opacity-75 bg-white relative">
                                        <img src="assets/images/popular/popular_hotel (1).png" alt=""
                                            className="w-full rounded rounded-b-none " />
                                        <p className="absolute md:top-32 top-48 left-3 rounded text-white text-xs shadow bg-[#54d1bb] p-1 px-2">
                                            FEATURED
                                        </p>
                                        <p className="absolute md:top-[120px] top-[180px] right-6  text-white text-sm shadow rounded-full p-1 px-2">
                                            <i class="fa-solid fa-shield-heart text-2xl"></i>
                                        </p>
                                        <div className="mt-3 p-3">


                                            <div className=" mb-4 text-xs ">
                                                <h1 className="text-lg text-gray-900 font-medium">Sayeman Beach Resort</h1>
                                                <div className="flex gap-3  pb-10">
                                                    <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                                                        className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                                            className="fa-solid fa-star"></i></span> <span className="text-gray-600">(2 reviews)</span>
                                                </div>




                                                <div>

                                                    <div className="flex justify-between">
                                                        <div>
                                                            <i class="fa-solid fa-clock"></i><span> 2 Days</span>

                                                        </div>
                                                        <p>  <div className="flex text-[#54d1bb] -ml-9">from
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3" fill="none"
                                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                    d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg><span className="text-sm">8999</span>
                                                        </div></p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Link>

                                <Link to="/tour-packages-details">
                                    <div
                                        className="border border-gray-100 shadow-xl rounded  transition hover:shadow-md group-hover:opacity-75 bg-white relative">
                                        <img src="assets/images/popular/popular_hotel (1).png" alt=""
                                            className="w-full rounded rounded-b-none " />
                                        <p className="absolute md:top-32 top-48 left-3 rounded text-white text-xs shadow bg-[#54d1bb] p-1 px-2">
                                            FEATURED
                                        </p>
                                        <p className="absolute md:top-[120px] top-[180px] right-6  text-white text-sm shadow rounded-full p-1 px-2">
                                            <i class="fa-solid fa-shield-heart text-2xl"></i>
                                        </p>
                                        <div className="mt-3 p-3">


                                            <div className=" mb-4 text-xs ">
                                                <h1 className="text-lg text-gray-900 font-medium">Sayeman Beach Resort</h1>
                                                <div className="flex gap-3  pb-10">
                                                    <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                                                        className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                                            className="fa-solid fa-star"></i></span> <span className="text-gray-600">(2 reviews)</span>
                                                </div>




                                                <div>

                                                    <div className="flex justify-between">
                                                        <div>
                                                            <i class="fa-solid fa-clock"></i><span> 2 Days</span>

                                                        </div>
                                                        <p>  <div className="flex text-[#54d1bb] -ml-9">from
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3" fill="none"
                                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                    d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg><span className="text-sm">8999</span>
                                                        </div></p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                                <Link to="/tour-packages-details">
                                    <div
                                        className="border border-gray-100 shadow-xl rounded  transition hover:shadow-md group-hover:opacity-75 bg-white relative">
                                        <img src="assets/images/popular/popular_hotel (1).png" alt=""
                                            className="w-full rounded rounded-b-none " />
                                        <p className="absolute md:top-32 top-48 left-3 rounded text-white text-xs shadow bg-[#54d1bb] p-1 px-2">
                                            FEATURED
                                        </p>
                                        <p className="absolute md:top-[120px] top-[180px] right-6  text-white text-sm shadow rounded-full p-1 px-2">
                                            <i class="fa-solid fa-shield-heart text-2xl"></i>
                                        </p>
                                        <div className="mt-3 p-3">


                                            <div className=" mb-4 text-xs ">
                                                <h1 className="text-lg text-gray-900 font-medium">Sayeman Beach Resort</h1>
                                                <div className="flex gap-3  pb-10">
                                                    <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                                                        className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                                            className="fa-solid fa-star"></i></span> <span className="text-gray-600">(2 reviews)</span>
                                                </div>




                                                <div>

                                                    <div className="flex justify-between">
                                                        <div>
                                                            <i class="fa-solid fa-clock"></i><span> 2 Days</span>

                                                        </div>
                                                        <p>  <div className="flex text-[#54d1bb] -ml-9">from
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3" fill="none"
                                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                    d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg><span className="text-sm">8999</span>
                                                        </div></p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Link>

                            </div> */}
                                </div>

                                <div className="mt-5">
                                    Full Specification
                                    <div className="grid  grid-cols-2 ">
                                        <div className="border px-3">
                                            <p>Ratting</p>
                                        </div>
                                        <div className="border">
                                            <Rating
                                                ratingValue={5}
                                                isHalf={true}
                                                className="text-[#ffa820] flex !important"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 col-span-4 pb-3">
                                {/* <div className="border border-gray-300 p-1 w-full w-ful px-4">
                            <div className="flex gap-6">
                                <div>
                                    <h1 className="font-semibold">Excellent</h1>
                                    <p className="text-xs text-[#5388ff]">from 2 reviews</p>
                                </div>
                                <div className="bg-[#5388ff] my-2 text-center  flex items-center justify-center px-2 text-white rounded">
                                    4.5/ <span className="text-xs">5</span>
                                </div>
                            </div>
                            <p className="text-xs">100% of guests recommended</p>
                        </div> */}
                                <div className="border text-sm text-gray-600">
                                    <div className=" flex gap-2 p-1 border-b text-center justify-center py-2">
                                        <p>from</p>
                                        <h1 className="text-lg font-semibold ">৳ {tourPackage.new_package_amount.toLocaleString()} </h1>
                                    </div>

                                    <div className=" flex  p-1 border-b text-center justify-between px-4 py-2">
                                        <p>Start Date</p>
                                        <h1 className="font-semibold">{tourPackage.package_start_date !== '' ? moment(tourPackage.package_start_date).format('DD MMMM YYYY') : null}</h1>
                                    </div>
                                    <div className=" flex  p-1 border-b text-center justify-between px-4 py-2 font-semibold">
                                        <p>Booking Date</p>
                                        <DatePicker
                                            selected={bookingDate} onChange={(date) => setBookingDate(date)}
                                            className=' px-4 py-[1px] focus:outline-none placeholder:text-sm border rounded-md w-full date '
                                            minDate={moment().toDate()}
                                            dateFormat="MMMM d, yyyy"

                                        />

                                    </div>
                                    <div className=" flex  p-1 border-b  justify-between px-4 py-2">
                                        <div>
                                            <p className="font-semibold">Guests</p>
                                            {/* <p className="text-sm">Age 18+</p> */}
                                            {/* <p className="text-xs">৳ 1800</p> */}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500">
                                            {/* <i class="fa-solid fa-circle-minus text-sm"></i> */}
                                            <p className="text-sm text-gray-600">{tourPackage.total_guest}</p>
                                            {/* <i class="fa-solid fa-circle-plus text-sm"></i> */}
                                        </div>

                                    </div>

                                    {/* <div className=" flex  p-1 border-b  justify-between px-4 py-2">
                                <div>
                                    <p className="font-semibold">Child</p>
                                    <p className="text-xs">Age 6-17</p>
                                    <p className="text-xs">৳ 850</p>
                                </div>

                                <div className="flex items-center gap-2 text-gray-500">
                                    <i class="fa-solid fa-circle-minus text-sm"></i>
                                    <p className="text-xs text-gray-600">2</p>
                                    <i class="fa-solid fa-circle-plus text-sm"></i>
                                </div>

                            </div>


                            <div className=" flex  p-1 border-b text-center justify-between px-4 py-2">
                                <p>Service charge</p>
                                <h1 className="font-semibold">৳ 150</h1>
                            </div>

                            <div className=" flex  p-1 border-b text-center justify-between px-4 py-2">
                                <p>Vat(5%)</p>
                                <h1 className="font-semibold">৳ 90</h1>
                            </div> */}
                                    <div className=" flex  p-1 border-b text-center justify-between px-4 py-4">
                                        <p className="text-lg font-semibold">Total</p>
                                        <h1 className="text-lg font-semibold">৳ {tourPackage.new_package_amount.toLocaleString()}</h1>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <input type="button" value="Book Now" onClick={() => bookTourPackage()} disabled={bookingLoader}
                                        className="bg-[#407bff] hover:bg-[#2e2e2e] text-slate-50 p-1 py-2 mt-2 px-14 rounded transition w-full  font-medium cursor-pointer" />
                                </div>

                            </div>


                        </div>

                    </div >
                </> : null


            }

        </div>
    )
}

export default TourPackagesDetails