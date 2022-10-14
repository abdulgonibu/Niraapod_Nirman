import React from 'react';
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";

const Help = () => {
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

            <div className='list-none py-4 shadow '>
                <div className='container flex gap-10'>
                    <li className='Booking cursor-pointer'>Booking</li>
                    <li className='Getin cursor-pointer'>Get in Touch</li>
                </div>
            </div>
            <div className="container py-10">
                <div className="md:w-10/12 w-full mx-auto mt-2 text-sm text-left">

                    <div className="flex flex-col justify-center  w-full Booking-list">
                        <h3 className="mb-8">
                            <span className="text-lg sm:text-xl lg:text-2xl leading-titles font-bold w-full lg:w-full uppercase">
                                Bookings
                            </span>
                        </h3>
                        <div>
                            <div className="relative mb-4">
                                <input type="checkbox" id="toggle1" className="toggle hidden" />
                                <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle1">
                                    How to cancel or change my reservation?
                                </label>
                                <div className="content bg-white overflow-hidden">
                                    <p className="p-4">To cancel or change your reservation, please contact the booking site directly. You can can find the booking site’s contact details in your confirmation email.
                                        If you can’t find your booking confirmation, we recommend checking your spam folder first. If you still cannot find it, we recommend a few simple tips for you!
                                    </p>
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <input type="checkbox" id="toggle2" className="toggle hidden" />
                                <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle2">
                                    Who do I contact about a refund or an invoice inquiry?
                                </label>
                                <div className="content bg-white overflow-hidden">
                                    <p className="p-4">If you would like to inquire about a refund or anything to do with your invoice, please contact the booking site directly. They are responsible for booking and payment processes, so they are in the best position to help you. The booking site’s contact details can be found in your booking confirmation email.

                                        .</p>
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <input type="checkbox" id="toggle3" className="toggle hidden" />
                                <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle3">
                                    Where is my booking confirmation?

                                </label>
                                <div className="content bg-white overflow-hidden">
                                    <p className="p-4">Sometimes it can take up to 72 hours for the booking confirmation to be received at your email address.
                                        Did not receive anything yet?
                                        Check your spam folder - In most cases, the confirmation email is already received there.
                                        If you still haven't received it, please contact the booking site you used, they will be able to assist you.</p>
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <input type="checkbox" id="toggle4" className="toggle hidden" />
                                <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle4">
                                    How can I submit a review or feedback on my stay?
                                </label>
                                <div className="content bg-white overflow-hidden">
                                    <p className="p-4">You can share your experience with other travelers and review the property directly at the booking site. As they manage your reservation, they will be able to assist you with any feedback on your stay. </p>
                                </div>
                            </div>

                            <div className="relative mb-4">
                                <input type="checkbox" id="toggle4" className="toggle hidden" />
                                <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle4">
                                    How can I submit a review or feedback on my stay?
                                </label>
                                <div className="content bg-white overflow-hidden">
                                    <p className="p-4">You can share your experience with other travelers and review the property directly at the booking site. As they manage your reservation, they will be able to assist you with any feedback on your stay. </p>
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <input type="checkbox" id="toggle4" className="toggle hidden" />
                                <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle4">
                                    How can I submit a review or feedback on my stay?
                                </label>
                                <div className="content bg-white overflow-hidden">
                                    <p className="p-4">You can share your experience with other travelers and review the property directly at the booking site. As they manage your reservation, they will be able to assist you with any feedback on your stay. </p>
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <input type="checkbox" id="toggle4" className="toggle hidden" />
                                <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle4">
                                    How can I submit a review or feedback on my stay?
                                </label>
                                <div className="content bg-white overflow-hidden">
                                    <p className="p-4">You can share your experience with other travelers and review the property directly at the booking site. As they manage your reservation, they will be able to assist you with any feedback on your stay. </p>
                                </div>
                            </div>


                        </div>


                    </div>

                    <div className=' hidden Getin-list'>

                        <div className="flex flex-col justify-center  w-full">
                            <h3 className="mb-8">
                                <span className="text-lg sm:text-xl lg:text-2xl leading-titles font-bold w-full lg:w-full uppercase">
                                    Get in touch
                                </span>
                            </h3>
                            <div>
                                <div className="relative mb-4">
                                    <input type="checkbox" id="toggle1" className="toggle hidden" />
                                    <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle1">
                                        How to cancel or change my reservation?
                                    </label>
                                    <div className="content bg-white overflow-hidden">
                                        <p className="p-4">To cancel or change your reservation, please contact the booking site directly. You can can find the booking site’s contact details in your confirmation email.
                                            If you can’t find your booking confirmation, we recommend checking your spam folder first. If you still cannot find it, we recommend a few simple tips for you!
                                        </p>
                                    </div>
                                </div>
                                <div className="relative mb-4">
                                    <input type="checkbox" id="toggle2" className="toggle hidden" />
                                    <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle2">
                                        Who do I contact about a refund or an invoice inquiry?
                                    </label>
                                    <div className="content bg-white overflow-hidden">
                                        <p className="p-4">If you would like to inquire about a refund or anything to do with your invoice, please contact the booking site directly. They are responsible for booking and payment processes, so they are in the best position to help you. The booking site’s contact details can be found in your booking confirmation email.

                                            .</p>
                                    </div>
                                </div>
                                <div className="relative mb-4">
                                    <input type="checkbox" id="toggle3" className="toggle hidden" />
                                    <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle3">
                                        Where is my booking confirmation?

                                    </label>
                                    <div className="content bg-white overflow-hidden">
                                        <p className="p-4">Sometimes it can take up to 72 hours for the booking confirmation to be received at your email address.
                                            Did not receive anything yet?
                                            Check your spam folder - In most cases, the confirmation email is already received there.
                                            If you still haven't received it, please contact the booking site you used, they will be able to assist you.</p>
                                    </div>
                                </div>
                                <div className="relative mb-4">
                                    <input type="checkbox" id="toggle4" className="toggle hidden" />
                                    <label className="title block font-bold bg-white p-4 cursor-pointer" for="toggle4">
                                        How can I submit a review or feedback on my stay?
                                    </label>
                                    <div className="content bg-white overflow-hidden">
                                        <p className="p-4">You can share your experience with other travelers and review the property directly at the booking site. As they manage your reservation, they will be able to assist you with any feedback on your stay. </p>
                                    </div>
                                </div>



                            </div>




                        </div>

                        <div className='md:w-[600px] w-full my-10 mx-auto shadow-md border border-gray-300 rounded'>
                            <div className='p-5 space-y-5'>
                                <h1 className='text-xl'>Submit a request</h1>
                                <div className='grid text-gray-600 gap-1'>
                                    <label htmlFor="">Your e-mail address</label>
                                    <input type="text" className='py-2 focus:outline-none border border-gray-300 rounded' />
                                </div>
                                <div className='grid text-gray-600 gap-1'>
                                    <label htmlFor="">Subject</label>
                                    <input type="text" className='py-2 focus:outline-none border border-gray-300 rounded' />
                                </div>
                                <div className='grid text-gray-600 gap-1'>
                                    <label htmlFor="">Messege</label>
                                    <textarea name="" className='focus:outline-none border border-gray-300 rounded' id="" cols="30" rows="5">
                                    </textarea>
                                </div>
                                <div className='grid text-gray-600 gap-1 '>
                                    <label htmlFor="">Attatchments(optional)</label>
                                    <input type="file" className='py-2 focus:outline-none border border-gray-300 rounded' />
                                </div>

                                <button className='py-2 bg-[#4f85ff] text-center w-full text-gray-50 rounded' type='submit'>Submit</button>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default Help;