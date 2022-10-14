import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import {HOTEL_USER_RESERVATION_URL} from '../constants/api'
import { ThreeCircles } from  'react-loader-spinner'





const HotelBookingList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);

   
    const getHotelBookingLists = async ()=>{
    
        let token=localStorage.getItem('token',''); 
        if(token!=='' && token!==null && token!==undefined){
            const response = await axios(HOTEL_USER_RESERVATION_URL,{headers: {
                'Authorization': `Token ${token}`
            }});    
            if(response.data){
                if(response.data.results.length>0){
                    setBookings(response.data.results)
                    setLoading(false);
                }else{
                    setLoading(false);
                }
                // navigate("/vehicle-confirm",{state:{'tripId':response.data.id}});
            }else{
                setLoading(false);
            }
        }
        
    }

    useEffect(()=>{
        getHotelBookingLists()
    },[navigate])

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
            <React.Fragment>
            <div className='container py-10 w-[800px] '>
                <div className="flex justify-between ">
                    <div>
                        <h1 className='font-semibold '>Hotel Booking lists</h1>
                        <p className='text-xs text-gray-600'>See the bookings and service  you’ve enjoyed with niraapod travels..</p>
                    </div>

                </div>
                <div className="py-5">
                    <div className="flex justify-between border p-2 px-5">
                    <div className="font-semibold text-gray-500">
                            Hotel Name
                        </div>
                        <div className="font-semibold text-gray-500">
                            Room Name
                        </div>
                        <div className="font-semibold text-gray-500">
                            Booking Days
                        </div> 
                        <div className="font-semibold text-gray-500">
                            Check In Date
                        </div>
                        <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            Check Out Date
                        </div>
                        <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            Total Fare
                        </div>
                        <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            Status
                        </div>
                        <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            Action
                        </div> *
                    </div>
                    {bookings.map((booking,index)=>(
                    <div className="flex justify-between border border-t-0  px-5 p-2" key={index}>
                            <div className="font-semibold text-gray-500 ">
                                {booking.hotel ?booking.hotel.hotel_name:null}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                                {booking.room ?booking.room[0].room_name:null}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                            {booking.booking_days}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                                {booking.number_of_person}
                            </div>
                            <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            {booking.check_in_date!==''  ? moment(booking.check_in_date).format('DD MMMM YYYY'):'-'}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                             {booking.check_out_date!==''  ? moment(booking.check_out_date).format('DD MMMM YYYY'):'-'}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                             {booking.total_amount.toLocaleString()}
                            </div>
                            
                           
                            <div className="text-gray-500 cursor-pointer text-right font-semibold">
                                Confirmed
                            </div>
                            <div className="text-gray-500 cursor-pointer text-right font-semibold" onClick={()=>navigate("/booking-details",{state:{'reservationID':booking.id}})}>
                                See details
                            </div>
                       
                      
                    </div>
                      ))}
                   
                </div>

            </div>
            <ThreeCircles
                height="100"
                width="100"
                color="#00103d"
                wrapperStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: '100vh',
                  }}
                wrapperClass=""
                visible={loading}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
                />
           </React.Fragment>     
        </div>
    )
}

export default HotelBookingList