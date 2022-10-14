import React, { useEffect, useState } from "react";

import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
const PersonalDeatails = () => {
    const [user, setUser] = useState({
        phone_no: '',
        first_name: '',
        last_name: '',
        user_photo: null,
        email: null,
        address: ''
    })
    useEffect(() => {

        setTimeout(() => {
            const curuser = localStorage.getItem('currentUser', '')
            if (curuser !== null && curuser !== '') {
                let data = JSON.parse(curuser)
                setUser(data)
            }
            // Disricts()
            //setFrom(location.state)
        }, 500);


    }, [])

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

            <div className='container py-10 w-[800px] mt-10'>
                <div className="flex justify-between px-5">
                    <div>
                        <h1 className='font-semibold '>Personal details</h1>
                        <p className='text-xs text-gray-600'>Update your info and see how it is used.</p>
                    </div>
                    <div>
                        <img src="./assets/images/user.png" className="w-10 h-10 rounded-full" alt="" />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-6'>
                </div>
                <div className="py-5 ">
                    <div className="grid grid-cols-3 border p-2 px-5">
                        <div className="font-semibold text-gray-500">
                            Name:
                        </div>
                        <div className="text-gray-600 ml-18">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="text-gray-500 cursor-pointer text-right font-semibold">
                            Edit
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border border-t-0  px-5 p-2">

                        <div className="font-semibold text-gray-500 ">
                            Display name:
                        </div>
                        <div className="text-gray-600 ml-18">
                            {user.first_name}
                        </div>
                        <div className="text-gray-600 cursor-pointer text-right font-semibold ">
                            Edit
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border border-t-0  px-5 p-2">
                        <div className="font-semibold text-gray-500">
                            Email address:
                        </div>
                        <div className="text-gray-600 ml-18">
                            {user.email}
                        </div>
                        {/* <div className="text-gray-600 cursor-pointer text-right font-semibold ">

                            Edit
                        </div> */}
                    </div>
                    <div className="grid grid-cols-3 border border-t-0  px-5 p-2">
                        <div className="font-semibold text-gray-500">
                            Phone number:
                        </div>
                        <div className="text-gray-600 ml-18">
                            {user.phone_no}
                        </div>
                        {/* <div className="text-gray-600 cursor-pointer text-right font-semibold ">

                            Edit
                        </div> */}
                    </div>


                    {/* <div className="grid grid-cols-3 border border-t-0  px-5 p-2">
                        <div className="font-semibold text-gray-500">
                            Gender:
                        </div>
                        <div className="text-gray-600 ml-18">
                            Male
                        </div>
                        <div className="text-gray-600 cursor-pointer text-right font-semibold ">
                            Edit
                        </div>
                    </div> */}



                </div>
            </div>


        </div>
    )
}

export default PersonalDeatails