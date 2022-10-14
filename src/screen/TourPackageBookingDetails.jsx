import React, { useEffect,useState } from "react";
import {TOUR_PACKAGES_RESERVE_URL} from '../constants/api'
import moment from 'moment';
import {  Link,useLocation } from "react-router-dom";
import axios from "axios";
const TourPackageBookingDetails = () => {
    const [reservationInfo, setReservationInfo] = useState([]);
    const location = useLocation();

   
    const getTourPackageReservationInfo = async (url) => {
        const token=localStorage.getItem('token','');
        if(token){
           
            const response = await axios(url,{headers: {
                'Authorization': `Token ${token}`
              }});
            if(response.data){  
                setReservationInfo(response.data) 
            }   
        }else{

        }
            
    }
    useEffect(() => {
        let id= location.state['reservationID']
        let url=TOUR_PACKAGES_RESERVE_URL+id+'/'
        getTourPackageReservationInfo(url)
    }, [])


return (
<div className='container mx-auto md:w-[700px] w-full text-left mt-20 py-5 shadow-lg p-10 order-complete '>
<p className='text-center'> <span className='text-green-500'>Thank you,</span>  your package has been booked successfully!</p>
<div className='grid md:grid-cols-2 gap-20 py-10'>
    <div>
        <h1 className='font-semibold text-gray-600'>Tour Package Booking Information</h1>
        <p className='border-b border-gray-500 py-2'></p>

        <div className='flex gap-10 py-3'>

            <h6 className='font-bold text-gray-500'>Full Name</h6>
            {reservationInfo.user ?
            <h6 className='text-sm text-gray-700'>{reservationInfo.user ? reservationInfo.user.first_name : ''}{reservationInfo.user.last_name ? ' '+reservationInfo.user.last_name:''}</h6>
            :null
            }

        </div>
        {reservationInfo.hotel ?
        <>
        <p className='border-b border-gray-500 py-2'></p>
        <h1 className='py-3 font-semibold text-gray-600'>Hotel Name</h1>
        <p className='text-blue-400 -mt-2 text-sm'>{reservationInfo.hotel ? reservationInfo.hotel.hotel_name:null }</p>
        </>
        :null
        }
        <p className='border-b border-gray-500 py-2'></p>
        <h1 className='py-3 font-semibold text-gray-600'>Guest</h1>
        <p className='text-blue-400 -mt-2 text-sm'>{reservationInfo.guest}</p>
        <p className='border-b border-gray-500 py-2'></p>
        <h1 className='py-3 font-semibold text-gray-600'>Amount to be Paid</h1>
        <p className='text-blue-400 -mt-2 text-sm'>BDT  {reservationInfo.amount}</p>

    </div>
    <div>
        <h1 className='font-semibold text-gray-600'>Reservation ID:{reservationInfo.tour_package_reserve_id}</h1>
        <p className='border-b border-gray-500 py-2'></p>
        {/* <div>
            <h1 className='text-xl font-semibold py-2 text-gray-600'>
                Sayeman Beach Resort</h1>
            <p className='text-xs text-center'><i className="fa-solid fa-location-dot text-gray-600 "></i>Cox's Bazar, Bangladesh</p>
            <p className='border-b border-gray-500 py-2'></p>
        </div> */}
        <h1 className='font-medium text-lg text-blue-400 mt-3'>Summary</h1>

        <div className='flex gap-10 mt-1 pb-3 text-sm'>
            <div>
                <h6 className='font-medium text-gray-500'>Duration Name</h6>
                <h6 className='font-medium text-gray-500'>Check In Date</h6>
               
               
                
            </div> 
            <div className=''>
                <h6 className=' text-blue-400'>{reservationInfo.duration}</h6>
                <h6 className=' text-blue-400'>{moment(reservationInfo.booking_date).format('DD MMMM YYYY')}</h6>
               
            </div>
        </div>
       

        
   
    </div>
</div>
<div className='flex justify-center  gap-10 mt-10 text-gray-100'>
    <button className='bg-[#2f76b8] p-1 text-sm rounded px-6' type='submit'>Download Receipt</button>
    <Link className='bg-[#2f76b8] p-1 text-sm rounded ' to='/tour-packages'>Continue Booking</Link>
</div>
</div>
    );
}



export default TourPackageBookingDetails;