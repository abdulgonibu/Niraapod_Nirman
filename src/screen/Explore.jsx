import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import { VEHICLE_FARE_URL, HOTEL_URL } from '../constants/api'
import VehicleComponent from "../components/VehicleComponent";
import { Slider } from "@material-ui/core";
import TopVistedPlaces from '../components/TopVisited'
import ContentLoader from 'react-content-loader'

const Explore = () => {
    const [vehicleLists, setvehicleLists] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [smallnumber, setSmallNumber] = useState(0);
    const [largenumber, setLargeNumber] = useState(0);
    const [fetchingData, setFetchingData] = useState(false);
    const [visitedResorts, setVisitedResorts] = useState([])
    const [loads, setLoads] = useState([1, 2, 3, 4, 5, 6]);

    const getVisitedResort = async () => {
        const result = await axios.get(HOTEL_URL + '?hotel_type=2&count_booked=0');
        if (result.data.results.length > 0) {
            setVisitedResorts(result.data.results)
        }
    }

    const slidePriceRange = async (newValue) => {
        setFetchingData(false)
        let url = '?fare=' + newValue[0] + '&fare_2=' + newValue[1]
        let hotelURL = VEHICLE_FARE_URL + url
        const result = await axios(hotelURL);
        if (result.data.results.length > 0) {
            setvehicleLists(result.data.results);
            setFetchingData(true)

        } else {
            setvehicleLists([]);
            setFetchingData(true)

        }
    }

    const getVehicesClassWithPrice = async () => {
        setFetchingData(false)
        const response = await axios(VEHICLE_FARE_URL);
        if (response.data) {
            if (response.data.results.length > 0) {
                let numrows = response.data.results
                setvehicleLists(numrows)
                let smallest = 0, largest = 0, minrat = 0, maxRat = 0
                smallest = numrows[0].total_fare
                for (var i = 0; i < numrows.length; i++) {
                    if (parseFloat(numrows[i].total_fare) > largest) {
                        largest = parseFloat(numrows[i].total_fare);
                        setLargeNumber(largest)
                    }
                    if (parseFloat(numrows[i].total_fare) < smallest) {
                        smallest = parseFloat(numrows[i].total_fare);
                        setSmallNumber(smallest)
                    }
                    if (parseFloat(numrows[i].vehicle_class.vehicle_ratings) <= maxRat) {
                        maxRat = parseFloat(numrows[i].vehicle_class.vehicle_ratings);
                    }
                    if (parseFloat(numrows[i].vehicle_class.vehicle_ratings) < minrat) {
                        minrat = minrat
                    }
                }
                setPriceRange([smallest, largest])

            }
            setFetchingData(true)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            getVehicesClassWithPrice()
            getVisitedResort()
        }, 3000);
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
            <div className="container flex md:flex-row flex-col gap-5 py-10 pb-10">
                <div className="shadow basis-1/4  pb-5">
                    <img src="assets/images/googleMap.jpg" alt="" />
                    <p className="py-2 text-center w-ful">Popular filters for Vehicle </p>
                    <p className="border-t py-2 w-full"></p>
                    <div className="text-center">
                        <label for="" className="text-center">Price Range</label>
                        <Slider className="w-full" valueLabelDisplay="auto" value={priceRange} min={smallnumber} max={largenumber} aria-labelledby="range-slider" onChange={(event, newValue) => setPriceRange(newValue)} onChangeCommitted={(event, newValue) => slidePriceRange(newValue).then()} />
                        <p className="text-[10px]">BDT {priceRange[0]} - BDT {priceRange[1]}</p>
                        <p className="border-b py-2 w-full"></p>
                    </div>
                </div>

                <div className="basis-3/4 md:mt-0 mt-5">
                    <p className='text-left pb-2 text-gray-800'>Explore this exciting beautiful places with niraapod travels.</p>
                    {vehicleLists.map((vehicle, index) => (
                        <VehicleComponent
                            data={vehicle}
                            index={index}
                        />
                    ))}
                    {!fetchingData ?
                        <>
                            {loads.map((load, index) => (
                                <ContentLoader viewBox="0 0 380 100"
                                    speed={2}
                                    style={{ width: '100%', marginTop: '20px' }}
                                    key={index}
                                >
                                    {/* Only SVG shapes */}
                                    <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
                                    <rect x="120" y="17" rx="4" ry="4" width="300" height="13" />
                                    <rect x="120" y="40" rx="3" ry="3" width="250" height="10" />

                                </ContentLoader>
                            ))}
                        </>
                        : null
                    }

                </div>
            </div>
            {/* <div className='container'>
                <p className='py-5 text-center text-2xl font-medium text-purple-500'>Popular roaming places</p>
                <div className='grid md:grid-cols-3 gap-2'>
                    <div className=' shadow transform hover:scale-125 transition-all duration-700 z-0 hover:z-50 border-orange-500 hover:border-pink-500 border-2'>
                        <img src="assets/images/place/jaflong.jpg" alt="" className='w-full ' />
                        <p className='text-purple-500 font-bold py-2 bg-gray-100 text-lg text-center border-2 border-t-orange-500'>Jaflong</p>
                    </div>
                    <div className=' shadow transform hover:scale-125 transition-all duration-700 z-0 hover:z-50 border-orange-500 hover:border-pink-500 border-2'>
                        <img src="assets/images/place/Bisanakandi.jpg" alt="" className='w-full  text-lg' />
                        <p className='text-purple-500 font-bold py-2 bg-gray-100 text-center border-2 border-t-orange-500border-2 border-t-orange-500'>Bisanakandi</p>
                    </div>
                    <div className=' shadow transform hover:scale-125 transition-all duration-700 z-0 hover:z-50 border-orange-500 hover:border-pink-500 border-2'>
                        <img src="assets/images/place/Sreemongol.jpg" alt="" className='w-full text-lg' />
                        <p className='text-purple-500 font-bold py-2 bg-gray-100 text-center border-2 border-t-orange-500'>Sreemongol</p>
                    </div>
                    <div className=' shadow transform hover:scale-125 transition-all duration-700 z-0 hover:z-50 border-orange-500 hover:border-pink-500 border-2'>
                        <img src="assets/images/place/BhawalResort&Spa.png" alt="" className='w-full text-lg' />
                        <p className='text-purple-500 font-bold py-2 bg-gray-100 text-center border-2 border-t-orange-500'>Bhawal Resort & Spa</p>
                    </div>
                    <div className=' shadow transform hover:scale-125 transition-all duration-700 z-0 hover:z-50 border-orange-500 hover:border-pink-500 border-2'>
                        <img src="assets/images/place/ChutiResort.webp" alt="" className='w-full text-lg' />
                        <p className='text-purple-500 font-bold py-2 bg-gray-100 text-center border-2 border-t-orange-500'>Chuti Resort</p>
                    </div>
                    <div className=' shadow transform hover:scale-125 transition-all duration-700 z-0 hover:z-50 border-orange-500 hover:border-pink-500 border-2'>
                        <img src="assets/images/place/Coxsbazar.jpg" alt="" className='w-full text-lg' />
                        <p className='text-purple-500 font-bold py-2 bg-gray-100 text-center border-2 border-t-orange-500'>Cox Bazar</p>
                    </div>
                </div>
            </div> */}

            <div style={{ backgroundImage: "url(assets/images/nira.png)" }} className="w-full h-full py-10 bg-contain bg-no-repeat mt-5">
                <h1 className="md:py-[235px]  w-full text-white text-center md:text-3xl font-semibold ">Let us show you the country <br />
                    with the most popular destinations</h1>
            </div>

            <TopVistedPlaces
                heading="Top visited places"
                places={visitedResorts}
            />
        </div>
    );

}

export default Explore;