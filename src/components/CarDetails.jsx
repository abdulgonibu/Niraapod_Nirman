import React, { useEffect, useState } from "react";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import { useLocation, useNavigate,  } from "react-router-dom";
import moment from 'moment';
import DatePicker from "react-datepicker";
import Image from '../common/Image'
import {SECRET_APP,SECRET_PASSWORD} from '../constants/config'
import {TRIP_URL} from '../constants/api'
import axios from "axios";
const CarDetails = () => {
    let location = useLocation();
    let navigate=useNavigate()
    const [vehicleFare, setVehicleFare] = useState({});
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [images, setImages] = useState([1,2,3]);
    const [signIn, setSignIn] = useState(false);

    const handleClick = async(bookingData) => {
        bookingData['journey_date'] = moment(journeyDate).format('dd-mm-yyyy')
        let token = localStorage.getItem('token', '');
        if(token !== '' & token !== null &&  bookingData.vehicle_class.id !== ''){
                let user=localStorage.getItem('currentUser','');
             
                let vehicle=bookingData.vehicle_class.id
                let phone_no='',full_name='',last_name='',user_id=''
                if(user!==''){
                    user=JSON.parse(user)
                    user_id=user.id
                    if(user.last_name !==null && user.last_name !==''){
                        last_name=' '+user.last_name
                    }
                    phone_no=user.phone_no
                    full_name=user.first_name+last_name
                   
               

                let data={
                    'user_id':user_id,
                    'district_from':bookingData.district_from,
                    'district_to':bookingData.district_to,
                    'vehicle_class':vehicle,
                    'SECRET_KEY':SECRET_PASSWORD,
                    'SECRET_APP':SECRET_APP,
                    'check_in_date':moment(journeyDate).format('DD-MM-YYYY'),
                    'phone_no':phone_no,
                    'trip_type':1,
                    'discount_amount':0,
                    'total_fare':parseFloat(bookingData.total_fare)

                    } 
                    // if(check_out_date!==''){
                    //     data['check_out_date']=moment(check_out_date.toString()).format('DD-MM-YYYY') 
                    // }
               
                
                const response = await axios.post(TRIP_URL, data,{headers: {
                    'Authorization': `Token ${token}`
                }});    
                if(response.data){
                    navigate("/vehicle-confirm",{state:{'tripId':response.data.id}});
                }
            }
             
            
        }else{
            navigate('/signin')
        }
    };

    useEffect(() => {
        setVehicleFare(location.state)
        // setTimeout(() => {
        //     getTourPackageDetails('?slug=' + slug)
        // }, 1000);
    }, [])


    return (
        <div>
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
            </div>
            <div className='container py-10'>
                <div className='grid md:grid-cols-2'>
                    <div>
                        <div className='flex gap-1'>
                            <div className='basis-[80%]'>
                            <Image
                                className="w-full h-full"
                                imagePath={vehicleFare.vehicle_class?vehicleFare.vehicle_class.vehicle_class_photo:null}
                            />
                                {/* <img src="assets/images/car.png" className='w-full h-full' alt="" /> */}
                            </div>

                            <div className='basis-[20%]'>
                                <div className='grid gap-1 mt-1'>
                               {images.map((image,index)=>(     
                                <Image
                                    className="h-24"
                                    imagePath={vehicleFare.vehicle_class?vehicleFare.vehicle_class.vehicle_class_photo:null}
                                    index={index}
                                />
                                ))}
                                    
                                </div>

                            </div>
                        </div>

                        <div className="bg-gray-50 shadow-2xl text-black px-2  py-2 mx-auto  text-left">
                            <form action="" className="bg-gray-50 ">
                                <div className="grid md:grid-cols-5 grid-cols-2">

                                    <div className="border border-solid border-gray-400 rounded-l ">
                                        <label htmlFor="from" className="text-xs text-slate-500 px-1">Journey Date</label> <br />
                                        <DatePicker
                                            selected={journeyDate} onChange={(date) => setJourneyDate(date)}
                                            className=' px-4 py-[6px] focus:outline-none placeholder:text-sm border-gray-300  border rounded w-full date '
                                            minDate={moment().toDate()}
                                            dateFormat="dd/MM/Y"
                                      />
                                    </div>

                                    <div className="border border-l-0 border-solid border-gray-400   ">
                                        <label htmlFor="from" className=" text-xs text-slate-500 px-1">Travellers</label>
                                        <br />
                                        <select name="" className="bg-gray-200 js-example-basic-multiple w-full ">
                                            <option value="">{vehicleFare.vehicle_class ? vehicleFare.vehicle_class.seat_capacity:0} Guests</option>
                                            {/* <option value="">4 Traveler</option> */}
                                        </select>
                                    </div>
                                    <div className="border border-t-0 md:border-t md:border-l-0 border-solid border-gray-400  ">
                                        <label htmlFor="from" className=" text-xs text-slate-500 px-1">Vehicle</label>
                                        <br />
                                        <select name="" className="bg-gray-200 js-example-basic-multiple w-full ">
                                            <option value={vehicleFare.vehicle_class?vehicleFare.vehicle_class.vehicle_type.id:0}>{vehicleFare.vehicle_class?vehicleFare.vehicle_class.vehicle_type.name:null}</option>
                                        </select>
                                    </div>

                                    <div className="border border-t-0 md:border-t border-l-0 border-solid border-gray-400  rounded-r  ">
                                        <label htmlFor="from" className=" text-xs text-slate-500 px-1">Total cost</label>
                                        <br />
                                        <select name="" className="bg-gray-200 js-example-basic-multiple w-full ">
                                            <option value="">BDT  {vehicleFare.total_fare}</option>
                                            
                                        </select>
                                    </div>

                                    <div className="flex justify-center col-span-2 md:col-span-1 mt-2 md:mt-0 items-center text-center">

                                        <input type="button" value="Continue" onClick={() => handleClick(vehicleFare)}
                                            className="bg-[#f99746] ml-2 w-full py-2 md:py-4 text-slate-50 rounded" />

                                    </div>
                                </div>


                            </form>
                        </div>
                    </div>

                    <div className='text-left px-10 mt-5'>
                        <h1 className='font-semibold'>{vehicleFare.district_from_details ? vehicleFare.district_from_details.name:null} to {vehicleFare.district_to_details?vehicleFare.district_to_details.name:null} - 
                        One Way {vehicleFare.vehicle_class?vehicleFare.vehicle_class.name:null} Service
                        </h1>
                        <div className="flex gap-1 mt-2 text-gray-600">
                            <i className="fa-solid fa-location-dot  text-sm"></i>
                            <p className='text-sm'>{vehicleFare.district_from_details ? vehicleFare.district_from_details.name:null} </p>
                        </div>
                        {/* <h1 className='my-1 md:my-3 md:mt-0 text-sm mt-5'>Overview</h1>
                        <p className='text-xs text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                        <p className='mt-3 text-sm font-semibold'>Location</p>
                        <p className='text-xs'>{vehicleFare.district_from_details ? vehicleFare.district_from_details.name:null} Metropoliton</p>
                        <div className=" ">

                            <div className="mt-5">
                                <p>Include & Exclude</p>
                                <div className="-space-y-2">
                                    <div className="flex gap-1 ">
                                        <span className="text-green-300"><i className="fa-solid fa-check text-sm"></i></span>
                                        <p className="text-xs ">
                                            Pick and drop service in a private vehicle</p>
                                    </div>
                                    <div className="flex gap-1 ">
                                        <span className="text-green-300"><i className="fa-solid fa-check text-sm"></i></span>
                                        <p className="text-xs ">
                                            Bridge Toll</p>
                                    </div>
                                    <div className="flex gap-1 ">
                                        <span className="text-green-300"><i className="fa-solid fa-check text-sm"></i></span>
                                        <p className="text-xs ">
                                            Driver's meal cost</p>
                                    </div>
                                    <div className="flex gap-1 ">
                                        <span className="text-green-300"><i className="fa-solid fa-check text-sm"></i></span>
                                        <p className="text-xs ">
                                            Pick up from any location in Dhaka city</p>
                                    </div>
                                    <div className="flex gap-1 ">
                                        <span className="text-green-300"><i className="fa-solid fa-check text-sm"></i></span>
                                        <p className="text-xs ">
                                            from Dhaka to Chattogram.</p>


                                    </div>
                                    <div className="flex gap-2 ">
                                        <span className="text-red-500"><i className="fa-solid fa-xmark text-sm"></i></span>
                                        <p className="text-xs mt-1">
                                            Any kind of personal expenses.</p>
                                    </div>
                                    <div className="flex gap-2 ">
                                        <span className="text-red-500"><i className="fa-solid fa-xmark text-sm"></i></span>
                                        <p className="text-xs mt-1">
                                            Food / Meals / Drinking water for the Travelers</p>
                                    </div>
                                    <div className="flex gap-2 ">
                                        <span className="text-red-500"><i className="fa-solid fa-xmark text-sm"></i></span>
                                        <p className="text-xs mt-1">
                                            Anything that is not mentioned in the inclusion.</p>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}



export default CarDetails;