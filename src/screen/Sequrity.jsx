import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";

const Security = () => {
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
                <div className="flex justify-between ">
                    <div>
                        <h1 className='font-semibold '>Security</h1>
                        <p className='text-xs text-gray-600'>Adjust your security settings and set up two-factor authentication.</p>
                    </div>

                </div>


                <div className='grid grid-cols-3 gap-6'>
                </div>

                <div className="py-5 ">
                    <div className="grid grid-cols-3 border p-3 px-5 border-gray-300">
                        <div className="font-semibold text-gray-500 text-sm">
                            Password
                        </div>
                        <div className="text-gray-600  text-xs -mr-20">
                            Reset your password regularly to keep your account secure
                        </div>
                        <div className="text-gray-500 cursor-pointer ml-36 font-semibold text-sm">
                            Reset
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border border-t-0  px-5 p-3 border-gray-300">

                        <div className="font-semibold text-gray-500 text-sm">
                            Two factor authentication
                        </div>
                        <div className="text-gray-600  text-xs -mr-20">
                            Add a phone number to set up two factor authentication.
                        </div>
                        <div className="text-gray-600 cursor-pointer ml-36 font-semibold text-sm">
                            Set up
                        </div>
                    </div>
                    <div className="grid grid-cols-3 border border-t-0 cursor-pointer px-5 p-3 border-gray-300">
                        <div className="font-semibold text-gray-500 text-sm">
                            Delete account
                        </div>
                        <div className="text-gray-600  text-xs -mr-5">
                            Permanently delete your Booking.com account
                        </div>
                        <div className="text-gray-600 cursor-pointer ml-36 font-semibold text-sm">

                            Delete account
                        </div>
                    </div>
                </div>

            </div>

            <div className='container w-[800px] pb-52 py-32'>



                <div className='grid grid-cols-3 gap-6'>
                </div>

                <div className="py-5 ">
                    <div className="grid grid-cols-3 border p-3 px-5 border-gray-300">
                        <div className="font-semibold text-gray-500 text-sm">
                            Password
                        </div>
                        <div className="text-gray-600 -ml-6 text-xs -mr-20">
                            To change your password, we need to send a reset link to
                            your email address
                        </div>
                        <div className="text-gray-500 cursor-pointer ml-36 font-semibold text-sm text-center">
                            <p>Cancel</p>
                            <p className="bg-[#ff9c00] text-center text-xs text-white p-1 rounded">Send email</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border border-t-0  px-5 p-3 border-gray-300">

                        <div className="font-semibold text-gray-500 text-sm">
                            Two factor authentication
                        </div>
                        <div className="text-gray-600 -ml-6  text-xs -mr-20">
                            <p className="font-medium">Phone number</p>
                            <p>Add a phone number to set up two factor authentication.</p>
                            <select name="" id="" className="border border-gray-400 p-1 rounded-sm focus:outline-none">
                                <option className="border" value="">Bangladesh(+880)</option>
                                <option className="border" value="">Bangladesh(+880)</option>
                                <option className="border" value="">Bangladesh(+880)</option>
                            </select>
                            <p>To set up two-factor authentication, we’ll send a 6-digit code to
                                this number. You’ll be asked to enter it at the next step.</p>

                        </div>

                        <div className="text-gray-500 cursor-pointer ml-36 font-semibold text-sm text-center">
                            <p>Cancel</p>
                            <p className="bg-[#ff9c00] text-center text-xs text-white p-1 rounded mt-5">Send Code</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 border border-t-0 cursor-pointer px-5 p-3 border-gray-300">
                        <div className="font-semibold text-gray-500 text-sm">
                            Delete account
                        </div>
                        <div className="text-gray-600  text-xs -ml-6 -mr-16">
                            <div className="">
                                <p className="py-2">Why do you want to delete your account?</p>
                                <div className="flex gap-2">
                                    <input type="radio" name="" id="" /> <span className="font-medium">I get too many emails from niraapod travels.</span>
                                </div>
                                <p className="text-xs ml-5 py-1">If you If you want to keep your account benefits without any marketing emails,
                                    you can unsubscribe instead.</p>
                            </div>
                            <div className="py-2">
                                <div className="flex gap-2">
                                    <input type="radio" name="" id="" /> <span className="text-normal font-medium">I  want to use a different email address for my account.</span>
                                </div>
                                <p className="text-xs ml-5 py-1">There's a faster way! Change it below or update it in the "Personal details" section
                                    of your account settings.</p>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <input type="radio" name="" id="" className="text-normal" /> <span className="font-medium">Other</span>
                                </div>
                                <p className="text-xs ml-5 py-1">Do you have any feedback you'd like to share before you go?
                                    We'll use it to fix problems and improve our services.</p>
                                <textarea name="" className="border focus:outline-none border-gray-300 w-full ml-5 rounded" id="" cols="30" rows="5"></textarea>
                                <div className="flex gap-2 py-3 ml-5 justify-between">
                                    <p className="bg-[#ff9c00] text-center text-xs text-white p-1 px-2 rounded">Send email</p>
                                    <p className="bg-[#ff9c00] text-center text-xs text-white p-1 px-2  rounded">Send email</p>
                                    <p className="bg-[#ff9c00] text-center text-xs text-white p-1 px-2  rounded">Send email</p>
                                </div>
                            </div>

                        </div>
                        <div className="text-gray-600 cursor-pointer ml-36 font-semibold text-sm">

                            Delete account
                        </div>


                    </div>



                </div>

            </div>
            <p className="border-t container border-gray-300"></p>
        </div>
    )
}

export default Security