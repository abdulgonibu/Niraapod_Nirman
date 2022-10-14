import React, { useEffect,useState } from "react";
import {TRIP_URL} from '../constants/api'
import moment from 'moment';
import {  Link } from "react-router-dom";
import axios from "axios";
const VehicleBookingDetails = ({id=0}) => {
    const [tripInfo, setTripInfo] = useState([]);

   
    const getTripInfo = async (url) => {
        const token=localStorage.getItem('token','');
        if(token){
           
            const response = await axios(url,{headers: {
                'Authorization': `Token ${token}`
              }});
            if(response.data){  
                //alert(JSON.stringify(response.data))
                setTripInfo(response.data) 
            }   
        }else{

        }
            
    }
    useEffect(() => {
        let url=TRIP_URL+id+'/'
        getTripInfo(url)
    }, [])


return (
<div className='container mx-auto md:w-[700px] w-full text-left mt-20 py-5 shadow-lg p-10 order-complete '>
<p className='text-center'> <span className='text-green-500'>Thank you,</span>  your vehicle has been booked successfully!</p>
<div className='grid md:grid-cols-2 gap-20 py-10'>
    <div>
        <h1 className='font-semibold text-gray-600'>Vehicle Booking Information</h1>
        <p className='border-b border-gray-500 py-2'></p>

        <div className='flex gap-10 py-3'>

            <h6 className='font-bold text-gray-500'>Full Name</h6>
            {tripInfo.passenger ?
            <h6 className='text-sm text-gray-700'>{tripInfo.passenger.first_name ? tripInfo.passenger.first_name : ''}{tripInfo.passenger.last_name ? ' '+tripInfo.passenger.last_name:''}</h6>
            :null
            }

        </div>
        {/* <h1 className='py-3 font-semibold text-gray-600'>Payment Method</h1>
        <h6 className=' text-sm text-gray-700'>Debit Card</h6>
        <h6 className=' text-sm text-gray-700'>Credit Card</h6>
        <h6 className='text-sm text-gray-700'>Mobile Banking</h6> */}
        <p className='border-b border-gray-500 py-2'></p>
        <h1 className='py-3 font-semibold text-gray-600'>Advance Payment</h1>
        <p className='text-blue-400 -mt-2 text-sm'>BDT  {Math.round(tripInfo.total_fare*.3,1)}</p>
        <p className='border-b border-gray-500 py-2'></p>
        <h1 className='py-3 font-semibold text-gray-600'>Amount to be Paid</h1>
        <p className='text-blue-400 -mt-2 text-sm'>BDT  {tripInfo.total_fare}</p>

    </div>
    <div>
        <h1 className='font-semibold text-gray-600'>Booking ID:{tripInfo.trip_id}</h1>
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
                <h6 className='font-medium text-gray-500'>Trip Type</h6>
                <h6 className='font-medium text-gray-500'>Check In</h6>
                <h6 className='font-medium text-gray-500'>Start Point</h6>
                {tripInfo.trip_type===2 ?
                <>
                <h6 className='font-medium text-gray-500'>Check out</h6>
                <h6 className='font-medium text-gray-500'>Return Point</h6>
                </>
                :null
                }
            </div>
            <div className=''>
                {/* <h6 className=' text-blue-400'>Single Room</h6> */}
                <h6 className=' text-blue-400'>{tripInfo.trip_type===1 ? 'One Way':'Return'}</h6>
                <h6 className=' text-blue-400'>{moment(tripInfo.check_in_date).format('DD MMMM YYYY')}</h6>
                <h6 className=' text-blue-400'>{tripInfo.district_from?tripInfo.district_from.name:null}-{tripInfo.district_to?tripInfo.district_to.name:null}</h6>
                
                {tripInfo.trip_type===2 ?
                <>
                <h6 className=' text-blue-400'>{moment(tripInfo.check_out_date).format('DD MMMM YYYY')}</h6>
                <h6 className=' text-blue-400'>{tripInfo.district_to?tripInfo.district_to.name:null}-{tripInfo.district_from?tripInfo.district_from.name:null}</h6>
                </>    
                :null
                }
            </div>
        </div>
        {tripInfo.driver ?
            <>
        <h1 className='font-medium text-lg text-blue-400 mt-3'>Driver Information</h1>
        <div className='flex gap-10 mt-1 pb-3 text-sm'>
            <div>
                <h6 className='font-medium text-gray-500'>Driver Name</h6>
                <h6 className='font-medium text-gray-500'>Mobile No</h6>
            </div>

            <div className=''>
                <h6 className=' text-blue-400'>{tripInfo.driver.name}</h6>
                <h6 className=' text-blue-400'>{tripInfo.driver.contact_no}</h6>
            </div>
           
        </div>
        </>
            :null
            }

        {tripInfo.vehicle ?
            <>
        <h1 className='font-medium text-lg text-blue-400 mt-3'>Vehicle Information</h1>
        <div className='flex gap-10 mt-1 pb-3 text-sm'>
            <div>
                <h6 className='font-medium text-gray-500'>Vehicle Class</h6>
                <h6 className='font-medium text-gray-500'>Seat Capacity</h6>
                <h6 className='font-medium text-gray-500'>Vehicle Ratings</h6>
                <h6 className='font-medium text-gray-500'>Vehicle Type</h6>
                <h6 className='font-medium text-gray-500'>Grand Total</h6>
            </div>

            <div className=''>
                <h6 className=' text-blue-400'>{tripInfo.vehicle.name}</h6>
                <h6 className=' text-blue-400'>{tripInfo.vehicle.seat_capacity}</h6>
                <h6 className=' text-blue-400'>{tripInfo.vehicle.vehicle_ratings}</h6>
                <h6 className=' text-blue-400'>{tripInfo.vehicle.vehicle_type?tripInfo.vehicle.vehicle_type.name:null}</h6>
                <h6 className=' text-blue-400'>BDT  {tripInfo.total_fare}</h6>

            </div>
           
        </div>
        </>
            :null
            }
   
    </div>
</div>
<div className='flex justify-center  gap-10 mt-10 text-gray-100'>
    <button className='bg-[#2f76b8] p-1 text-sm rounded px-6' type='submit'>Download Receipt</button>
    <Link className='bg-[#2f76b8] p-1 text-sm rounded ' to='/'>Continue Booking</Link>
</div>
</div>
    );
}



export default VehicleBookingDetails;