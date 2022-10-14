import React, { useEffect,useState } from "react";
import {HOTEL_USER_RESERVATION_URL} from '../constants/api'
import moment from 'moment';
import {  Link,useLocation } from "react-router-dom";
import axios from "axios";
const HotelBookingDetails = () => {
    const [reservationInfo, setReservationInfo] = useState([]);
    const location = useLocation();

   
    const getHotelReservationInfo = async (url) => {
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
        let url=HOTEL_USER_RESERVATION_URL+id+'/'
        getHotelReservationInfo(url)
    }, [])


return (
<div className='container mx-auto md:w-[700px] w-full text-left mt-20 py-5 shadow-lg p-10 order-complete '>
<p className='text-center'> <span className='text-green-500'>Thank you,</span>  your hotel has been booked successfully!</p>
<div className='grid md:grid-cols-2 gap-20 py-10'>
    <div>
        <h1 className='font-semibold text-gray-600'>Hotel Booking Information</h1>
        <p className='border-b border-gray-500 py-2'></p>

        <div className='flex gap-10 py-3'>

            <h6 className='font-bold text-gray-500'>Full Name</h6>
            {reservationInfo.guest ?
            <h6 className='text-sm text-gray-700'>{reservationInfo.guest.first_name ? reservationInfo.guest.first_name : ''}{reservationInfo.guest.last_name ? ' '+reservationInfo.guest.last_name:''}</h6>
            :null
            }

        </div>
        {/* <h1 className='py-3 font-semibold text-gray-600'>Payment Method</h1>
        <h6 className=' text-sm text-gray-700'>Debit Card</h6>
        <h6 className=' text-sm text-gray-700'>Credit Card</h6>
        <h6 className='text-sm text-gray-700'>Mobile Banking</h6> */}
        <p className='border-b border-gray-500 py-2'></p>
        <h1 className='py-3 font-semibold text-gray-600'>Advance Payment</h1>
        <p className='text-blue-400 -mt-2 text-sm'>BDT  {Math.round(reservationInfo.total_amount*.3,1)}</p>
        <p className='border-b border-gray-500 py-2'></p>
        <h1 className='py-3 font-semibold text-gray-600'>Amount to be Paid</h1>
        <p className='text-blue-400 -mt-2 text-sm'>BDT  {reservationInfo.total_amount}</p>

    </div>
    <div>
        <h1 className='font-semibold text-gray-600'>Reservation ID:{reservationInfo.reservation_id}</h1>
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
                <h6 className='font-medium text-gray-500'>Hotel Name</h6>
                <h6 className='font-medium text-gray-500'>Check In Date</h6>
                {reservationInfo.check_in_date!=='' ?
                <h6 className='font-medium text-gray-500'>Check Out Date</h6>
                :null
                }
                <h6 className='font-medium text-gray-500'>Adults</h6>
                
            </div> 
            <div className=''>
                <h6 className=' text-blue-400'>{reservationInfo.hotel?reservationInfo.hotel.hotel_name:null}</h6>
                <h6 className=' text-blue-400'>{moment(reservationInfo.check_in_date).format('DD MMMM YYYY')}</h6>
                {reservationInfo.check_in_date!=='' ?
                 <h6 className=' text-blue-400'>{moment(reservationInfo.check_out_date).format('DD MMMM YYYY')}</h6>
                :null
                }
                <h6 className=' text-blue-400'>{reservationInfo.adults}</h6>
               
            </div>
        </div>
       

        {reservationInfo.room!==undefined && reservationInfo.room!==null && reservationInfo.room!=='' ?
            <>
        <h1 className='font-medium text-lg text-blue-400 mt-3'>Room Information</h1>
        <div className='flex gap-10 mt-1 pb-3 text-sm'>
            <div>
                <h6 className='font-medium text-gray-500'>Room Name</h6>
                <h6 className='font-medium text-gray-500'>Adults</h6>
                <h6 className='font-medium text-gray-500'>Children</h6>
            </div>
            {reservationInfo.room.map((singleRoom,index)=>(
            <div className='' key={index}>
                <h6 className=' text-blue-400'>{singleRoom.room_name}</h6>
                <h6 className=' text-blue-400'>{singleRoom.number_of_person}</h6>
                <h6 className=' text-blue-400'>{singleRoom.number_of_children !=='' ? singleRoom.number_of_children :0}</h6>
            </div>
            ))}
        </div>
        </>
            :null
            }
   
    </div>
</div>
<div className='flex justify-center  gap-10 mt-10 text-gray-100'>
    <button className='bg-[#2f76b8] p-1 text-sm rounded px-6' type='submit'>Download Receipt</button>
    <Link className='bg-[#2f76b8] p-1 text-sm rounded ' to='/hotel-list'>Continue Booking</Link>
</div>
</div>
    );
}



export default HotelBookingDetails;