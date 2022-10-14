import React from 'react';
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import Footer from '../common/Footer'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>

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

            <div className=' bg-[#1a69ae] py-32 h-full pb-64'>
                <h1 className='text-[150px] text-center font-extrabold text-[#e7ff6f]  pt-16'>404 !</h1>
                <p className='text-center text-white text-5xl'>Sorry ! Your Page Not Found</p>
                <p className='text-center text-white text-lg pt-5 pb-16 font-thin'>Which page your are looking for might have been removed had its name changed or is tempoarial unaviable</p>

                <div className='text-center block'>
                    <Link to="/">
                        <div className=' text-white text-center items-center justify-center  bg-[#3185ce] p-1 inline-block px-2 rounded'>
                            <i class="fa-solid fa-house-chimney text-sm "></i>
                            <button type="submit" className='text-white text-sm  ml-2'>Go to Home</button>
                        </div>
                    </Link>


                    <div className=' text-white text-center items-center justify-center ml-6  bg-[#3185ce] p-1 inline-block px-2 rounded'>
                        <i class="fa-solid fa-envelope text-sm"></i>
                        <button type="submit" className='text-white text-sm  ml-2'>Contact Us</button>
                    </div>

                </div>

            </div>
            <Footer />

        </>
    );

}

export default NotFound;