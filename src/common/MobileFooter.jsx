import React from "react";
import { Link } from "react-router-dom";

const MobileFooter = ({ bgcolor, }) => {
    return (
        <div style={{ background: bgcolor }} >
            <div className="flex md:hidden justify-between items-center text-center container font-semibold text-gray-600 mx-auto py-2.5 text-sm bg-white shadow-md px-10 p-2 bottom-0 fixed z-50 ">
                <Link to="/">
                    <i class="fa-solid fa-house-user"></i>
                    <p>Home</p>
                </Link>
                <Link to="/vehicle-select">
                    <i class="fa-solid fa-car"></i>
                    <p>Vehicle</p>
                </Link>
                <Link className="" to="/hotel-search">
                    <i class="fa-solid fa-hotel"></i>
                    <p>Resorts</p>
                </Link>
                <Link className="" to="/singin">
                    <i class="fa-solid fa-user"></i>
                    <p>Account</p>

                </Link>
            </div>
        </div>
    )
}

export default MobileFooter