import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Image from '../common/Image'


const PopularHotelsResorts = ({ datas = [] }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: true,
        autoplay: true,
        // autoplaySpeed: 500,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container pb-10">
            <section id="courses" className="mt-12">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <h1 className="md:text-3xl text-sm text-pink-600 md:text-center md:font-semibold py-2  md:py-2">Most Popular Hotels & Resorts</h1>
                        <Link to="/hotel-list">
                            <button
                                className="transition bg-[#fe2b5c] hover:bg-[#2e2e2e] uppercase md:text-sm text-xs  md:px-4 md:p-2 md:my-1 p-1 border rounded text-white">
                                View More
                            </button>
                        </Link>
                    </div>

                    <div id="popular-course " className="py-2">
                        <Slider {...settings}>

                            {datas.map((data, index) => (
                                <div className="course-item group relative" key={index}>
                                    <div className="border border-gray-100 shadow-xl rounded mr-3 transition hover:shadow-md group-hover:opacity-75 bg-white">
                                        {
                                            data.gallery_images !== undefined && data.gallery_images.length > 0 ?
                                                <Image
                                                    className="w-full rounded rounded-b-none h-60"
                                                    imagePath={data.gallery_images[0].image}
                                                />
                                                : null
                                        }
                                        <p className="absolute top-3 left-3 rounded text-white text-sm shadow bg-[#f65f13] p-1 px-2">
                                            {data.is_feature ? 'FEATURED' : 'POPULAR'}
                                        </p>
                                        <p className="absolute top-2 right-6  text-white text-sm shadow rounded-full p-1 px-2">
                                            <i class="fa-solid fa-shield-heart text-2xl"></i>
                                        </p>
                                        <div className="mt-3 p-3">


                                            <div className=" mb-4 text-xs ">
                                                <h1 className="text-lg text-gray-900 font-medium">{data.hotel_name}</h1>
                                                <h2 className="text-sm text-gray-600  font-sm">
                                                    {data.address ? data.address : 'Address is not set'}
                                                </h2>

                                                <div className="flex justify-between mt-4">
                                                    <div>
                                                        <span className="bg-[#54d1bb] text-slate-50 p-1 rounded text-sm">
                                                            {data.ratings}/5
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-green-600">
                                                            Average
                                                        </span>
                                                        <span className="text-[11px]">( {data.hotel_reviews.length} reviews)</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex mt-5">
                                                        <span className="mr-10 ">Form</span>

                                                        <div className="flex text-[#54d1bb] -ml-9">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                    d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg><span className="text-sm">
                                                                {
                                                                    data.hotel_room !== undefined && data.hotel_room.length > 0 ?
                                                                        data.hotel_room[0].price.toLocaleString()
                                                                        : null
                                                                }
                                                            </span>
                                                        </div>


                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Per Night</span>
                                                        <p>See Details</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}


                        </Slider>
                    </div>

                </div>

            </section>
        </div>
    )
}
export default PopularHotelsResorts