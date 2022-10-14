import React from 'react';
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";

const OrderConfirm = () => {
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
            <div className="container py-16 relative">
                <div className="border-b-2 relative border-gray-400 shadow">
                    <p className="absolute -top-2.5 w-5 h-5 rounded-full bg-gray-300 text-sm text-center text-gray-900"> <span>
                        1</span>
                        <span className="w-52 text-sm absolute top-8 -left-24">Customer Information</span>
                    </p>
                    <p
                        className="absolute -top-2.5 right-[598px] w-5 h-5 rounded-full bg-gray-300 text-sm text-center text-gray-900">
                        2 <span className="w-52 text-sm absolute top-8 -left-24">Payment Information</span> </p>
                    <p className="absolute -top-2.5 right-0 w-5 h-5 rounded-full bg-gray-300 text-sm text-center text-gray-900">
                        3 <span className="w-52 text-sm absolute top-8 -left-24">Booking Confirmed</span> </p>
                </div>

                {/* Booking Confirmed */}
                <div className="py-32 md:w-[600px] mx-auto text-left customer-information">
                    <form action="" className="shadow p-5">
                        <h2 className="py-5">Let us know who you are</h2>
                        <div className="space-y-8">
                            <div>
                                <label for="" className="relative">
                                    <input type="text"
                                        className="border rounded-sm border-gray-600 focus:outline-none px-3 w-full py-2" />
                                    <span className="absolute left-0 -top-6 mx-8 bg-white text-gray-800 font-Inter px-2">Name*</span>
                                </label>
                            </div>
                            <div>
                                <label for="" className="relative">
                                    <input type="text"
                                        className="border rounded-sm border-gray-600 focus:outline-none px-3 w-full py-2" />
                                    <span className="absolute left-0 -top-6 mx-8 bg-white text-gray-800 font-Inter px-2">Email*</span>
                                </label>
                            </div>
                            <div className="flex gap-5">
                                <div className="mb-2 md:mb-0 w-full">
                                    <label for="" className="
                                  relative">

                                        <input type="text"
                                            className="border rounded-sm border-gray-600 focus:outline-none w-full py-2" />
                                        <span className="absolute left-0 -top-6 md:mx-8 mx-2 bg-white text-gray-800 font-Inter
                                     px-2">Phone number*</span>
                                    </label>
                                </div>

                                <div className="w-full">
                                    <label for="" className="relative">
                                        <input type="text"
                                            className="border rounded-sm border-gray-600 focus:outline-none w-full  py-2" />
                                        <span className="absolute left-0 -top-6 mx-8 bg-white text-gray-800 font-Inter px-2 ">City/region*</span>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="">
                            <div className="my-5">
                                <input type="checkbox" name="" id="" /> <span className='text-sm'>Please tick if you are making this booking this
                                    for someone else</span>
                            </div>
                            <h2 className="font-semibold">Let us know what you need</h2>
                            <p className="text-xs">Requests are fulfilled on a first come, first served basis. We'll send yours
                                right after you
                                book.</p>
                            <div className="bg-gray-100 p-2 text-sm text-gray-600 rounded-sm">
                                <p>Do you have a smoking preference?</p>
                                <div className="my-2">
                                    <input type="radio" name="Non smoking" id="" /> <span>Non smoking</span> <input type="radio"
                                        name="Non smoking" id="" /> <span>smoking</span>
                                </div>

                                <p>Do you have a smoking preference?</p>
                                <div className="my-2">
                                    <input type="radio" name="Non smoking" id="" /> <span>I’d like a large bed</span> <input
                                        type="radio" name="Non smoking" id="" /> <span> I’d like twin beds</span>
                                </div>

                            </div>
                        </div>
                        <div className="text-center">
                            <p className="bg-[#5d8dfb] p-2 rounded-sm px-8 text-gray-100 customer cursor-pointer" >Next Step</p>
                        </div>

                    </form>
                </div>

                {/* Customer Pament  */}
                <div className="container mx-auto md:w-[700px] w-full shadow-md py-5 text-left hidden customer-payment mt-20">
                    <div className="shadow-md p-3 flex flex-col md:flex-row md:items-start md:justify-start justify-center items-center">
                        <img src="assets/images/vector/lock.png" className=" h-6" alt="" />
                        <p className="font-bold text-[#5d8dfb] border-r px-2 border-gray-300">Secure Payment</p>
                        <p className="text-xs ml-2 p-1">All card information is fully encrypted, secure and protected.</p>
                    </div>

                    <div className="md:mx-2 pb-5 border border-[#5d8dfb] border-t-0 ">
                        <div className="flex justify-between bg-[#5d8dfb] rounded-sm px-2 ">
                            <p className="text-sm py-2 text-gray-50 ">CREDIT/DEBIT CARD</p>
                            <div className="flex gap-2 items-center justify-center text-center">
                                <img src="assets/images/vector/visa.png" className="h-4" alt="" />
                                <img src="assets/images/vector/mastercard.png" alt="" />
                                <img src="assets/images/vector/aexpress.png" alt="" />
                            </div>

                        </div>
                        <div className='mx-2'>
                            <p className="text-xs py-2 px-2">Select a payment method</p>
                            <div className="border border-gray-400 flex px-2 p-1 gap-2">
                                <img src="assets/images/vector/ss.png" className="h-5 text-center mt-1" alt="" />
                                <select name="" id="" className="text-gray-500 js-example-basic-multiple w-full">
                                    <option value="">Visa/Mastercard/American Express</option>
                                    <option value="">Visa/Mastercard/American Express</option>
                                    <option value="">Visa/Mastercard/American Express</option>
                                </select>
                            </div>
                            <div>
                                <p className="bg-[#e6f8e1] text-[#22651c]  w-[300px] text-xs text-center shadow">Last step! You are
                                    almost
                                    there.
                                </p>
                            </div>
                            <div className="md:flex md:justify-between md:gap-10 mt-5">

                                <div className="md:basis-2/3 w-full">
                                    <div className='w-full'>

                                        <label className="py-1 block text-sm">Card holder name</label>
                                        <input type="text" className="border w-full border-gray-400  p-2 focus:outline-none text-sm" />
                                        <label className="py-1 block text-sm">Credit/Debit Card Number</label>
                                        <input type="text" className="border border-gray-400  p-2 w-full focus:outline-none" />

                                        <div className="flex md:flex-row flex-col mt-2 gap-4 w-full">

                                            <div className="flex flex-col">
                                                <label className="">Expire Date</label>
                                                <input type="date" className="border border-gray-400 w-full  py-2 focus:outline-none " />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className=" ">cvc/cvv</label>
                                                <input type="number" className="border border-gray-400  py-2 w-full focus:outline-none " />
                                            </div>

                                            <div>
                                                <img src="assets/images/vector/sfd.png" className="h-10 mt-6  w-full" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/3 mt-10">
                                    <img src="assets/images/vector/gg.png" className="w-fll hidden md:block" alt="" />
                                </div>

                            </div>
                            <div className='py-5 text-xs space-y-2'>
                                <input type="checkbox" name="" id="" /> <span>Email me for exclusive promotions. </span>
                                <p>By proceeding with this booking, I agree to Niraapod Travels Terms of Use and Privacy Policy.</p>
                                <p><i className="fa-solid fa-envelope text-gray-500"></i> We'll send confirmation of your booking to abdulgoni.me@gmail.com address.</p>
                            </div>
                            <div className="text-center">
                                <button className="bg-[#5d8dfb] p-2 rounded-sm px-8 text-gray-100 payment" type="submit">Next Step</button>
                            </div>
                        </div>


                    </div>

                </div>

                {/* Payment Information */}
                <div className='container mx-auto md:w-[700px] w-full text-left mt-20 py-5 shadow-lg p-10 order-complete hidden'>
                    <p className='text-center'> <span className='text-green-500'>Thank you,</span>  your booking is complete!</p>
                    <div className='grid md:grid-cols-2 gap-20 py-10'>
                        <div>
                            <h1 className='font-semibold text-gray-600'>Booking Information</h1>
                            <p className='border-b border-gray-500 py-2'></p>

                            <div className='flex gap-10 py-3'>

                                <h6 className='font-bold text-gray-500'>Full Name</h6>
                                <h6 className='text-sm text-gray-700'>Abdul Goni</h6>

                            </div>
                            <h1 className='py-3 font-semibold text-gray-600'>Payment Method</h1>
                            <h6 className=' text-sm text-gray-700'>Debit Card</h6>
                            <h6 className=' text-sm text-gray-700'>Credit Card</h6>
                            <h6 className='text-sm text-gray-700'>Mobile Banking</h6>
                            <p className='border-b border-gray-500 py-2'></p>
                            <h1 className='py-3 font-semibold text-gray-600'>Amount to be Paid</h1>
                            <p className='text-blue-400 -mt-2 text-sm'>BDT  10,350</p>

                        </div>
                        <div>
                            <h1 className='font-semibold text-gray-600'>Booking Summary</h1>
                            <p className='border-b border-gray-500 py-2'></p>
                            <div>
                                <h1 className='text-xl font-semibold py-2 text-gray-600'>Sayeman Beach Resort</h1>
                                <p className='text-xs text-center'><i className="fa-solid fa-location-dot text-gray-600 "></i>Cox's Bazar, Bangladesh</p>
                                <p className='border-b border-gray-500 py-2'></p>
                            </div>
                            <h1 className='font-medium text-lg text-blue-400 mt-3'>Summary</h1>

                            <div className='flex gap-10 mt-1 pb-3 text-sm'>
                                <div>
                                    <h6 className='font-medium text-gray-500'>Room</h6>
                                    <h6 className='font-medium text-gray-500'>Price per night</h6>
                                    <h6 className='font-medium text-gray-500'>Check In</h6>
                                    <h6 className='font-medium text-gray-500'>Check out</h6>
                                </div>
                                <div className=''>
                                    <h6 className=' text-blue-400'>Single Room</h6>
                                    <h6 className=' text-blue-400'>BDT  4500</h6>
                                    <h6 className=' text-blue-400'>22 June 2022</h6>
                                    <h6 className=' text-blue-400'>24 June 2022</h6>
                                </div>
                            </div>
                            <h1 className='font-medium text-lg text-blue-400 mt-3'>Charge</h1>
                            <div className='flex gap-10 mt-1 pb-3 text-sm'>
                                <div>
                                    <h6 className='font-medium text-gray-500'>Time</h6>
                                    <h6 className='font-medium text-gray-500'>Guest/s</h6>
                                    <h6 className='font-medium text-gray-500'>VAT</h6>
                                    <h6 className='font-medium text-gray-500'>Fees</h6>
                                    <h6 className='font-medium text-gray-500'>Grand Total</h6>
                                </div>

                                <div className=''>
                                    <h6 className=' text-blue-400'>02 Nights </h6>
                                    <h6 className=' text-blue-400'>2 Adults, 1 Child</h6>
                                    <h6 className=' text-blue-400'>15%</h6>
                                    <h6 className=' text-blue-400'>Included</h6>
                                    <h6 className=' text-blue-400'>BDT  10,350</h6>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center  gap-10 mt-10 text-gray-100'>
                        <button className='bg-[#2f76b8] p-1 text-sm rounded px-6' type='submit'>PAYMENT</button>
                        <button className='bg-[#2f76b8] p-1 text-sm rounded ' type='submit'>PRINT RECIPT</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default OrderConfirm;