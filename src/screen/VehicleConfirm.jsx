import React from "react";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import {  useLocation,useNavigate } from "react-router-dom";

import VehicleBookingDetails from '../components/VehicleBookingDetails'
var tripId=0
const VehicleConfirm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    if(location.state !==null  && location.state.tripId!==''){
        tripId=location.state.tripId
    }else{
        navigate("/signin");       
    }
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
        <VehicleBookingDetails id={tripId}/>
        </div>
        )
}

export default VehicleConfirm
