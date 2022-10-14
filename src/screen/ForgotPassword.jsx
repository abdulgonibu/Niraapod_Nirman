import React from 'react';
import MobileNav from '../common/MobileNav';

import Nav from "../common/Nav";

const ForgotPassword =()=>{
        return (
            <div>
                <MobileNav />
                <div>
                    <nav className="bg-[#00294d]">
                        <div className="hidden md:block">
                            <Nav
                                home="Home"
                                Explore="Explore"
                                Help="Help"
                            />
                        </div>

                    </nav>
                    <div className="bg-[#fcfcfc] container md:mt-20 md:w-[650px] shadow-lg p-8 md:p-20">
                        <form className="mt-5">
                            <p className="py-5 text-[#7a003c] font-medium">Forgot Password?</p>
                            <p className="py-5 text-gray-400">Please enter your email address and we'll send you
                                a link to reset your password. </p>
                            <div className="relative">
                                <input type="text"
                                    className="border border-gray-200 rounded-sm p-3 border-l-[#7a003c] border-l-2 w-full shadow-sm outline-none text-sm  pl-8 focus:outline-none"
                                    placeholder="Your user ID or e-mail" />
                                <i className="fa-solid fa-envelope-circle-check h-16 absolute top-1 left-2 text-gray-400 mt-2.5"></i>
                            </div>
                            <div className="text-lg font-medium py-2 mt-5 bg-[#7a003c] w-full text-center text-white rounded-sm shadow-sm">
                                <a href="" className=" ">Sent Email</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    
}

export default ForgotPassword;