import React, { Component } from "react";


const Footer = () => {
    return (
        <div>

            <footer className="bg-[#00103F] text-white  text-left">
                <div className="container mx-auto px-5 py-16">
                    <div className="grid md:grid-cols-4">
                        <div className="basis-2/6">
                            <div className="p-5">
                                <img src="./images/logo-mini.png" alt="" className="w-10" />
                                <div>
                                    <h3 className="font-medium mt-4 mb-3">
                                        Call Us
                                    </h3>
                                    <div className="text-sm">
                                        <h4 className="mb-2">+8801962000000</h4>
                                        <h4 className="mb-2">hello@gmail.com</h4>
                                        <h4 className="mb-2">9AM- 5PM, Monday - Friday</h4>
                                        <h4 className="mb-2">198-202, Nawabpur Tower, Room no# 311 Nawabpur Road,Nawabpur,
                                            Dhaka-1100 Bangladesh.</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 col-span-2">
                            <div className="p-4">
                                <h3 className="font-medium mt-4 mb-3">
                                    Links
                                </h3>
                                <ul className="list-none mt-4">
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Start here
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Blogs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            About us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Career
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Courses
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium mt-4 mb-3">
                                    Information
                                </h3>
                                <ul className="list-none mt-4">
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Route Map
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Travel Guideline
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Travel advisory
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            About us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Services
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm">
                                            <i className="fa-solid fa-chevron-right text-xs mr-3"></i>
                                            Private Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="basis-2/6 md:-ml-28">
                            <div className="p-4">
                                <h3 className="font-medium mt-4 mb-3">
                                    Sign up for our newsletter
                                </h3>
                                <p className="text-sm">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut odit magnam officia sequi
                                    aliquid
                                    facere corporis dolorem beatae? Dolore pariatur illo odio nulla atque quibusdam dicta ut
                                    tempore, suscipit est.
                                </p>
                                <p className="mt-4 relative">
                                    <input type="email" placeholder="Your e-mail"
                                        className="w-full p-3 pl-5 bg-white rounded-full text-gray-700 placeholder:text-gray-700" />
                                    <span className="absolute top-1 right-2 bg-red-600 px-5 p-2 rounded-full uppercase">
                                        Subscribe
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="text-center mt-4">
                        &copy; 2022 All rights reserved.
                    </div>


                </div>
            </footer>

        </div>


    )

}

export default Footer;