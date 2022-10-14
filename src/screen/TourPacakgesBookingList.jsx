import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import {TOUR_PACKAGES_RESERVE_URL} from '../constants/api'
import { ThreeCircles } from  'react-loader-spinner'



const TourPacakgesBookingList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tourPackageBookings, settourPackageBookings] = useState([]);

   
    const getTourPackageLists = async ()=>{
    
        let token=localStorage.getItem('token',''); 
        if(token!=='' && token!==null && token!==undefined){
            const response = await axios(TOUR_PACKAGES_RESERVE_URL,{headers: {
                'Authorization': `Token ${token}`
            }});    
            if(response.data){
                if(response.data.results.length>0){
                    setLoading(false);
                    settourPackageBookings(response.data.results)
                    // console.log(response.data.results)
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
        getTourPackageLists()
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
                        <h1 className='font-semibold '>Tour Package Booking list</h1>
                        <p className='text-xs text-gray-600'>See the bookings and service  you’ve enjoyed with niraapod travels..</p>
                    </div>

                </div>
                <div className="py-5">
                    <div className="flex justify-between border p-2 px-5">
                    <div className="font-semibold text-gray-500">
                            Duration
                        </div>
                        <div className="font-semibold text-gray-500">
                            Booking Date
                        </div>
                        <div className="font-semibold text-gray-500">
                            Guest
                        </div> 
                       
                        <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            Total Amount
                        </div>
                       
                        <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            Action
                        </div> *
                    </div>
                    {tourPackageBookings.map((booking,index)=>(
                    <div className="flex justify-between border border-t-0  px-5 p-2" key={index}>
                            <div className="font-semibold text-gray-500 ">
                                {booking.duration}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                            {booking.booking_date!==''  ? moment(booking.booking_date).format('DD MMMM YYYY'):'-'}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                            {booking.guest}
                            </div>
                            <div className="font-semibold text-gray-500 ">
                                {booking.amount.toLocaleString()}
                            </div>
                            
        
                           
                           
                            <div className="text-gray-500 cursor-pointer text-right font-semibold" onClick={()=>navigate("/tour-package-booking-details",{state:{'reservationID':booking.id}})}>
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

export default TourPacakgesBookingList