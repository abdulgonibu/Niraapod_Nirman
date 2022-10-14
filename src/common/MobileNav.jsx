import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const MobileNav = ({ bgcolor, }) => {
    return (
        <div style={{ backgroundColor: bgcolor }}>

            <div className="flex md:hidden justify-between items-center text-center container mx-auto py-4 bg-[#00103f] shadow px-5 p-2.5 sticky top-0 z-30">
                <Link to="/"><img src="assets/images/logo.png" alt="" className="w-40" /></Link>
                <Link className="bg-[#575757] px-4 p-1 rounded-sm text-gray-50" to="/singin">Login</Link>
            </div>
        </div>
    )
}
export default MobileNav;


