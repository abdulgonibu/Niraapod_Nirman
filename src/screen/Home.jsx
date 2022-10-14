import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../common/Nav";
// import MobileNav from "../common/MobileNav";
import Footer from '../common/Footer'
import MobileFooter from '../common/MobileFooter'
import { HOTEL_URL, VEHICLE_FARE_URL } from '../constants/api'

import DestinationSearch from '../components/DestinationSearch'
import HotelSearch from '../components/HotelSearch'
import VehicleSearch from '../components/VehicleSearch'
import PopularHotelsResorts from '../components/PopularHotelsResorts'
import RecommendedCarRentals from '../components/RecommendedCarRentals'
import MobileNav from "../common/MobileNav";
import axios from "axios";
import TopVistedPlaces from '../components/TopVisited'
export const Home = () => {
    const [isDestinationBar, setDestinationBar] = useState(true)
    const [isHotelBar, setHotelBar] = useState(false)
    const [isVehicleBar, setVehicleBar] = useState(false)
    const [hotels, setHotels] = useState([])
    const [recommendVehicles, setRecommendVehicles] = useState([])
    const [visitedResorts, setVisitedResorts] = useState([])
    const showDestinationSearchVar = () => {
        setHotelBar(false)
        setDestinationBar(true)
        setVehicleBar(false)
    }
    const showHotelBar = () => {

        setHotelBar(true)
        setDestinationBar(false)
        setVehicleBar(false)
    }
    const showVehicleBar = () => {

        setHotelBar(false)
        setDestinationBar(false)
        setVehicleBar(true)
    }

    const getPopularHotel = async () => {


        const result = await axios.get(HOTEL_URL + '?count_booked=0');
        if (result.data.results.length > 0) {
            setHotels(result.data.results)
        }
    }
    const getVisitedResort = async () => {
        const result = await axios.get(HOTEL_URL + '?hotel_type=2&count_booked=0');
        if (result.data.results.length > 0) {
            setVisitedResorts(result.data.results)
        }
    }
    const getRecommendVehicleFare = async () => {


        const result = await axios.get(VEHICLE_FARE_URL);

        if (result.data.results.length > 0) {
            setRecommendVehicles(result.data.results)
        }
    }
    useEffect(() => {
        getPopularHotel()
        getVisitedResort()
        getRecommendVehicleFare()

    }, [])


    return (
        <div className="text-left relative">
            {/* Mobile Navbar */}

            <div className="container mx-auto  bg-[#000000] shadow  sticky top-0 z-50">
                <MobileNav />
            </div>
            {/* Mobile Navbar End*/}

            {/* Banner Section */}
            <nav className="h-[600px] bg-center bg-no-repeat" style={{ backgroundImage: "url(assets/images/banner.png)" }}>

                {/* PC Header Navbar */}
                <div className="hidden md:block">
                    <Nav
                        bgcolor="transparent"
                        home="Home"
                        Explore="Explore"
                        Help="Help"
                    />
                </div>
            </nav>
            {/* Banner Section End*/}

            {/* Banner Text */}
            <div className="flex  items-center justify-center">
                <div className="container mx-auto text-center text-white absolute top-32 md:top-[410px]">
                    <h1 className="md:text-3xl text-2xl font-bold">Planning for your next trip?</h1>
                    <p className="md:text-lg text-sm md:flex-row flex flex-col justify-center">Thinking of travelling somewhere soon? <span>Here are some options to help.</span> </p>
                </div>
            </div>
            {/* Banner Text End*/}

            {/* Search Start */}
            <div className="flex  items-center justify-center">
                <div className=" w-full  md:px-24 container   text-[#2e2e2e]  absolute top-52 md:top-[490px]">
                    <div className="bg-[#54d1bb] md:px-5 md:px:-20 p-4 rounded-t-xl">
                        <ul className="flex font-medium justify-between clear-left w-full font-roboto">
                            <li
                                className="cursor-pointer text-white hover:text-[#2e2e2e] focus:underline focus:underline-offset-8" onClick={() => showDestinationSearchVar()}>
                                <i className="fa-solid fa-location-dot text-[#2e2e2e] "></i>
                                <span className="ml-1 ">Destination</span>
                                {isDestinationBar ? <p className="border-b-[3px] border-[#2e2e2e] mt-1"></p> : <p></p>}
                            </li>
                            <li className="cursor-pointer text-white hover:text-[#2e2e2e]" onClick={() => showHotelBar()}><i className="fa-solid fa-hotel text-[#2e2e2e]  text-sm"></i> <span className="">Hotel</span>
                                {isHotelBar ? <p className="border-b-[3px] border-[#2e2e2e] mt-1"></p> : <p></p>}
                            </li>
                            <li className="cursor-pointer  text-white hover:text-[#2e2e2e]" onClick={() => showVehicleBar()}><i className="fa-solid fa-car-side mr-1 text-[#2e2e2e]"></i>
                                <span className="">Vehicle</span>
                                {isVehicleBar ? <p className="border-b-[3px] border-[#2e2e2e] mt-1"></p> : <p></p>}
                            </li>

                        </ul>
                    </div>

                    {/* Destination Search Start */}

                    <DestinationSearch display={isDestinationBar} />

                    {/* Destination Search End */}

                    {/* Hotel Search Start*/}

                    <HotelSearch display={isHotelBar} />

                    {/* Hotel Search End*/}

                    {/* Vehicle Search Start*/}

                    <VehicleSearch display={isVehicleBar} />

                    {/* Vehicle Search End*/}
                </div>
            </div>
            {/* Search End */}

            <div className="container mx-aut md:mt-20 py-10">
                <img src="assets/images/home.png" alt="" srcSet="" />
            </div>

            <div className="container">
                <div className="grid md:grid-cols-2 md:py-3 md:gap-32">
                    <div>
                        <h2 className="py-2  texl-3xl font-semibold text-[#a35079] text-left"> Find Great Tourist places Right Here</h2>
                        <p className="text-justify mb-5 text-slate-900">Dummy text ever since the 1500s, when an unknown printer
                            took. A
                            galley of
                            type
                            and scrambled it to
                            make a type specimen book. It has survived not only five centuries. Dummy text ever since the 1500s,
                            when an unknown printer took. A galley of type.</p>

                    </div>

                    <div className="py-2 md:py-0">
                        <h2 className="py-2 texl-3xl font-semibold text-[#a35079] text-left"> Find Great Tourist places Right
                            Here</h2>
                        <p className="text-justify text-slate-900">Dummy text ever since the 1500s, when an unknown printer took. A
                            galley of type
                            and scrambled it to
                            make a type specimen book. It has survived not only five centuries. Dummy text ever since the 1500s,
                            when an unknown printer took. A galley of type.</p>
                    </div>

                </div>
            </div>

            {/* Categories Section */}
            <section id="categories" className="mt-6">
                <div className="container mx-auto">
                    <h2 className="font-medium my-5 text-left md:text-3xl">Browse Categories</h2>

                    <div className="grid md:grid-cols-4 grid-cols-2 gap-2 items-center text-center  ">
                        <Link to="/explore">
                            <div
                                className="transform hover:scale-125 transition-all duration-700 hover:z-50 border-orange-500 hover:border-pink-500 border-2 basis-[45%] md:basis-[10.93%] bg-[#a9e8dd] cursor-pointer rounded shadow-md mr-3 p-5">
                                <div className="rounded-full m-0 mx-auto w-40  p-2.5">
                                    <img src="assets/images/TravelIcons/02.png" alt="" />
                                </div>
                                <h4 className=" mb-2 font-medium  ">
                                    Your Destinations
                                </h4>

                            </div>
                        </Link>
                        <Link to="/tour-packages">
                            <div
                                className="transform hover:scale-125 transition-all duration-700  hover:z-50 border-orange-500 hover:border-pink-500 border-2 basis-[45%] md:basis-[10.93%] bg-[#a9e8dd] cursor-pointer rounded shadow-md mr-3 p-5    ">
                                <div className="rounded-full m-0 mx-auto w-40  p-2.5">
                                    <img src="assets/images/TravelIcons/01.png" alt="" />
                                </div>
                                <h4 className=" mb-2 font-medium">
                                    Tour Packages
                                </h4>
                            </div>
                        </Link>
                        {/* <Link to="/tour-packages">
                            <div
                                className="transform hover:scale-125 transition-all duration-700 border-orange-500 hover:border-pink-500 border-2 basis-[45%] md:basis-[10.93%] bg-[#a9e8dd] cursor-pointer rounded shadow-md mr-3 py-2 hover:z-10 md:p-5    ">
                                <div className=" rounded-full m-0 mx-auto  md:h-32 p-2.5 ">
                                    <img src="assets/images/TravelIcons/03.png" alt="" />
                                </div>
                                <h4 className="mt-4 mb-2 font-medium">
                                    Travel Requirements
                                </h4>

                            </div>
                        </Link> */}
                        <Link to="/offer-packages">
                            <div
                                className="transform hover:scale-125 transition-all duration-700 hover:z-50  border-orange-500 hover:border-pink-500 border-2 basis-[45%] md:basis-[10.93%] bg-[#a9e8dd] cursor-pointer rounded shadow-md mr-3 p-5   ">
                                <div className="rounded-full m-0 mx-auto w-40  p-2.5">
                                    <img src="assets/images/TravelIcons/04.png" alt="" />
                                </div>
                                <h4 className=" mb-2 font-medium">
                                    Offer Packages
                                </h4>

                            </div>
                        </Link>

                        <Link to="/hotel-list">
                            <div
                                className="transform hover:scale-125 transition-all duration-700 hover:z-50  border-orange-500 hover:border-pink-500 border-2 basis-[45%] md:basis-[10.93%] bg-[#a9e8dd] cursor-pointer rounded shadow-md mr-3 p-5   ">
                                <div className="rounded-full m-0 mx-auto w-40  p-2.5">
                                    <img src="assets/images/TravelIcons/04.png" alt="" />
                                </div>
                                <h4 className=" mb-2 font-medium">
                                    Hotels & Resorts
                                </h4>

                            </div>
                        </Link>

                    </div>
                </div>
            </section>
            {/* Categories Section End*/}


            {/* Most Popular Hotels & Resorts */}

            <PopularHotelsResorts
                datas={hotels}
            />

            {/* Most Popular Hotels & Resorts End*/}

            <RecommendedCarRentals
                recommendVehicles={recommendVehicles}

            />

            <div style={{ backgroundImage: "url(assets/images/nira.png)" }} className="w-full h-full py-10 bg-contain bg-no-repeat ">
                <h1 className="md:py-[235px]  w-full text-white text-center md:text-3xl font-semibold ">Let us show you the country <br />
                    with the most popular destinations</h1>
            </div>
            <TopVistedPlaces
                heading="Top visited places"
                places={visitedResorts}
            />

            <Footer />
            <MobileFooter />
        </div >

    )

}

export default Home