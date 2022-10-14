
import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import axios from "axios";
import { TOUR_PACKAGES_URL } from '../constants/api'
import TourPackageSingle from '../components/TourPackageSingle'
import {Slider} from "@material-ui/core";
import { ThreeCircles } from  'react-loader-spinner'

const OfferPackage = () => {
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [smallnumber, setSmallNumber] = useState(0);
    const [largenumber, setLargeNumber] = useState(0);   
    const [tourOfferPackages, setTourOfferPackages] = useState([]);
    const [noOfTour, setNoOfTour] = useState(0);
    const [loading, setLoading] = useState(true);

    const getTourOfferPackages = async () => {
        const result = await axios.get(TOUR_PACKAGES_URL+'?discount_type=0');    
        if (result.data.results.length > 0) {
            setTourOfferPackages(result.data.results)
            setNoOfTour(result.data.count)
            let largest=0,minrat=0,smallest=0,
            maxRat=0,numrows=result.data.results
            for (var i = 0; i < numrows.length; i++) {   
                smallest=numrows[0].new_package_amount
                if (parseFloat(numrows[i].new_package_amount) > largest) {
                    largest = parseFloat(numrows[i].new_package_amount);
                    setLargeNumber(largest)
                }               
                if (parseFloat(numrows[i].new_package_amount) <= smallest) {  
                    smallest = parseFloat(numrows[i].new_package_amount);
                    setSmallNumber(smallest)
                    
                }           
            }
        
          setPriceRange([smallest,largest])
          setLoading(false)
        } else{   
            setLoading(false)
        }
        
    }

    const slidePriceRange = async(newValue)=>{
        // 4758,5000
        
            // const params = new URLSearchParams(props.slug);
            // setPriceRange(newValue)
             let url ='?discount_type=0&amount='+newValue[0]+'&amount_2='+newValue[1]
            // setFetchingData(true)
             const result = await axios(TOUR_PACKAGES_URL + url);
            // setVehicles([]);
             setTourOfferPackages(result.data.results);
             setNoOfTour(result.data.count)
            
    }

    useEffect(() => {
        getTourOfferPackages()
       
     
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

            <div className="shadow text-black container py-5">
                <form action="" className=" ">

                    <div className="grid md:grid-cols-3">
                        <div className="p-2 relative w-2.5/3 md:ml-40">
                            <input type="text"
                                className="focus:outline-none  py-2 rounded-md w-full pl-7 placeholder:text-sm border border-gray-300"
                                placeholder="Enter a destination " />
                            <i className="fa-solid fa-magnifying-glass absolute text-sm top-5 left-4 text-gray-400"></i>
                        </div>

                        <div className="flex w-full">
                            <div className="p-2 cursor-pointer w-full">
                                <div className=" flex border gap-3 border-gray-300 px-6 py-1 rounded">
                                    <i className="fa-solid fa-calendar flex items-center text-lg  text-gray-400"></i>
                                    <div>
                                        <p className="text-xs">17 Jun 2022</p>
                                        <p className="text-xs">Friday</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 cursor-pointer w-full">
                                <div className=" flex border gap-3 border-gray-300 px-6 py-1 rounded">
                                    <i className="fa-solid fa-calendar flex items-center text-lg  text-gray-400"></i>
                                    <div>
                                        <p className="text-xs">17 Jun 2022</p>
                                        <p className="text-xs">Friday</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" p-2 md:w-1/2">
                            <input type="button" value="Search"
                                className="bg-[#ed7d2b] py-2 text-slate-50  w-full rounded text-lg font-medium cursor-pointer" />
                        </div>
                    </div>

                </form>
            </div>
            <div className="container flex md:flex-row flex-col gap-5 py-10 text-left">
                <div className="shadow  basis-1/4 ">
                    <img src="assets/images/googleMap.jpg" alt="" />

                    <p className="py-2 text-center w-ful">Filters for Tour Offer Package Price </p>
                    <p className="border-t py-2 w-full"></p>
                    <div className="text-center">
                        <label for="" className="text-center">Price Range</label><br />
                        <Slider  className="w-full"  valueLabelDisplay="auto" value={priceRange} min={smallnumber} max={largenumber} aria-labelledby="range-slider" onChange={(event, newValue) => setPriceRange(newValue)} onChangeCommitted={(event, newValue) => slidePriceRange(newValue).then()}/>
                        <p className="text-[10px]">BDT {priceRange[0]} - BDT {priceRange[1]}</p>
                    </div>

                   
                    <p className=" py-2 w-full"></p>
                    <div className="px-2">
                        <p className="text-center py-5">Star Rating</p>
                        <input type="checkbox" name="" id="" /> <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                className="fa-solid fa-star"></i></span><br />
                        <input type="checkbox" name="" id="" /> <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                className="fa-solid fa-star"></i></span><br />
                        <input type="checkbox" name="" id="" /> <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></span><br />
                        <input type="checkbox" name="" id="" /> <span className="text-[#ffa820]" > <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i></span><br />
                        <input type="checkbox" name="" id="" /> <span className="text-[#ffa820]"> <i
                            className="fa-solid fa-star"></i></span><br />
                    </div>
                </div>

                <div className=" basis-3/4 ">
                    <div className="grid md:grid-cols-6 grid-cols-2 gap-2 md:border-2 border-gray-300 py-3  rounded-sm px-2 text-center bg-gray-100">
                        <div className="md:border-r-2 border md:p-0 p-2 md:border-0 border-gray-300">

                            <p>Sort</p>
                        </div>
                        <div className="md:border-r-2 border p-2 md:p-0 md:border-0 border-gray-300">
                            <p>Best Match</p>
                        </div>
                        <div className="md:border-r-2 border p-2 md:p-0 md:border-0 border-gray-300">
                            <p>Top reviewed</p>
                        </div>
                        <div className="md:border-r-2 border p-2 md:p-0 md:border-0  border-gray-300">
                            <p>Lowest price first</p>
                        </div>
                        <div className="md:border-r-2 border p-2 md:p-0 md:border-0 border-gray-300">
                            <p>Distance</p>
                        </div>
                        <div className="md:border-0 border p-2 md:p-0 border-gray-300">
                            <p>Other deals</p>
                        </div>
                    </div>

                    <p className="mt-5 font-semibold text-[#8b1f55]  ">{noOfTour> 1 ? noOfTour+' tours': noOfTour+' tour'}   found</p>

                    <div className="grid gap-3 md:grid-cols-3 pb-5">
                        {tourOfferPackages.map((tourOfferPackage,index) => (
                                <TourPackageSingle
                                tourPackage={tourOfferPackage}
                                index={index}
                            />
                        ))}
                    </div>
                    <ThreeCircles
                height="100"
                width="100"
                color="#00103d"
                wrapperStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: '100vh',
                  }}
                wrapperClass=""
                visible={loading}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
                />

                </div>
            </div>
        </div>
    )
}
export default OfferPackage
