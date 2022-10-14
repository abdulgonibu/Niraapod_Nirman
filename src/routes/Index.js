import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../screen/Home";
import Signup from "../screen/Signup";
import Signin from "../screen/Signin";
import ForgotPassword from "../screen/ForgotPassword";
import Hotel from "../screen/Hotel";
import Destination from "../components/Destination";
import CarDetails from "../components/CarDetails";
import OrderConfirm from "../components/OrderConfirm";
import RoomSelect from "../components/RoomSelect";
import Vehicle from "../components/Vehicle";
import Explore from "../screen/Explore";
import Help from "../screen/Help";
import TourPackages from '../screen/TourPackages';
import TourPackagesDetails from '../screen/TourPackagesdetails';
import NotFound from '../screen/NotFound';
import OfferPackage from '../screen/OfferPackage';
import OfferPackageDetails from '../screen/OfferPackageDetails';
import User_Dashboard from '../screen/User_Dashboard';
import PersonalDeatails from '../screen/PersonalDetails';
import Security from '../screen/Sequrity';
import PaymentDetails from '../screen/PaymentDetails';
import TripList from '../screen/TripList';
import VehicleConfirm from '../screen/VehicleConfirm';
import HotelLists from '../screen/HotelLists';
import HotelDetails from "../screen/HotelDetails";
import HotelBookingDetails from "../screen/HotelBookingDetails";
import VehicleLists from "../screen/VehicleLists";
import HotelBookingList from "../screen/HotelBookingList";
import TourPacakgesBookingList from "../screen/TourPacakgesBookingList";
import TourPackageBookingDetails from '../screen/TourPackageBookingDetails';


const Index = (props) => (

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/hotel-search" element={<Hotel />} />
        <Route path="/destination-search" element={<Destination />} />
        <Route path="/car-select" element={<CarDetails />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/room-select" element={<RoomSelect />} />
        <Route path="/vehicle-select" element={<Vehicle />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/help" element={<Help />} />
        <Route path="/tour-packages" element={<TourPackages />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/offer-packages' element={<OfferPackage />} />
        <Route path='/offer-packages-details' element={<OfferPackageDetails />} />
        <Route path='/user-dashboard' element={<User_Dashboard />} />
        <Route path='/personal-details' element={<PersonalDeatails />} />
        <Route path='/security' element={<Security />} />
        <Route path='/payment-details' element={<PaymentDetails />} />
        <Route path='/user-trip-list' element={<TripList />} />
        <Route path='/hotel-booking-list' element={<HotelBookingList />} />
        <Route path='/tour-package-booking-list' element={<TourPacakgesBookingList />} />
        <Route path='/hotel-list' element={<HotelLists />} />
        <Route path='/tour-package-details' element={<TourPackagesDetails />} />
        <Route path='/vehicle-confirm' element={<VehicleConfirm />} />
        <Route path='/hotel-details' element={<HotelDetails/>} />
        <Route path='/booking-details' element={<HotelBookingDetails/>} />
        <Route path='/vehicle-list' element={<VehicleLists/>} />
        <Route path='/tour-package-booking-details' element={<TourPackageBookingDetails/>} />

        
    </Routes>
);

export default Index;