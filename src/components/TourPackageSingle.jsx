
import Image from '../common/Image'
import { Link } from "react-router-dom";

const TourPackageSingle = ({ tourPackage, index }) => {
    return (
        <Link to={"/tour-packages-details?slug=" + tourPackage.slug} className="">
            <div
                className=" border-pink-500 shadow-xl rounded transform hover:scale-125 transition-all duration-700 hover:z-50  border-2  hover:shadow-md group-hover:opacity-75 bg-white relative" key={index}>
                {tourPackage.tour_gallery_images !== undefined}
                <Image
                    className="w-full h-52"
                    imagePath={tourPackage.tour_gallery_images[0].image}
                />
                <p className="absolute md:top-32 top-48 left-3 rounded text-white text-xs shadow bg-[#54d1bb] p-1 px-2">
                    {tourPackage.package_code}
                </p>
                <p className="absolute md:top-[120px] top-[180px] right-6  text-white text-sm shadow rounded-full p-1 px-2">
                    <i class="fa-solid fa-shield-heart text-2xl"></i>
                </p>

                <div className="mt-3 p-3">
                    <div className=" mb-4 text-xs ">
                        <h1 className="text-lg text-gray-900 font-medium">{tourPackage.package_name}</h1>
                        {/* <div className="flex gap-3  pb-10">
                <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                    className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                        className="fa-solid fa-star"></i></span> <span className="text-gray-600">{hotel.review}</span>
            </div> */}




                        <div>

                            <div className="flex justify-between">
                                <div>
                                    <i class="fa-solid fa-clock"></i><span> {tourPackage.duration_from} {tourPackage.duration_from_type === 1 ? 'Days' : 'Nights'}  {tourPackage.duration_at}  {tourPackage.duration_at_type === 1 ? 'Days' : 'Nights'}</span>

                                </div>
                                <p>
                                    {tourPackage.discount_type > 0 ?
                                        <div className="flex text-[#54d1bb] -ml-9">from
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <del className="text-sm">{tourPackage.package_amount.toLocaleString()}</del>
                                        </div> : null}

                                    <div className=" flex text-center text-red-600 font-semibold">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />

                                        </svg>
                                        {tourPackage.new_package_amount.toLocaleString()}</div>
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </Link>

    )
}
export default TourPackageSingle
