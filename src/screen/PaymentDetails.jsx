import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";

const PaymentDetails = () => {
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
                    <div className="text-right border p-3 px-5 border-gray-300">
                        <div className="text-gray-500 cursor-pointer ml-36 font-semibold text-sm">
                            + Add new traveler
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3  text-gray-500 text-sm pt-20">

                    <label htmlFor="">Name</label>
                    <div className="col-span-2 ">
                        <p className="text-xs -mt-9 py-2">  Get permission from your fellow travelers before entering their personal details.</p>
                        <div className="grid grid-cols-2 gap-10">
                            <div className="grid">
                                <label htmlFor="" className="font-semibold">First name</label>
                                <input type="text" className="focus:outline-none border p-1 border-gray-300" />
                            </div>
                            <div className="grid">
                                <label htmlFor="" className="font-semibold">First name</label>
                                <input type="text" className="focus:outline-none border p-1 border-gray-300" />
                            </div>
                        </div>
                        <p className="text-xs py-2">Enter this person’s name exactly as it's written on their passport or other
                            official travel document</p>
                    </div>

                </div>



                <div className="grid grid-cols-3 text-sm text-gray-500 py-2">
                    <label htmlFor="" className="">Date of Birth</label>
                    <div className="grid">
                        <label htmlFor="" className="font-semibold">Date of Birth</label>
                        <input type="date" className="focus:outline-none border p-1 border-gray-300" />
                        <p className="py-2 text-xs">It’s important to enter a correct date of birth because these details
                            can be used for booking</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PaymentDetails