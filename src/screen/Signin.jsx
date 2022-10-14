import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import axios from "axios";
import { LOGIN_URL, CHECK_USER_URL } from "../constants/api"

import { SECRET_APP, SECRET_PASSWORD } from '../constants/config'


const Signin = () => {

    const intialValues = { phone_no: "" };
    const intialPassValues = { password: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formPassValues, setFormPassValues] = useState(intialPassValues);
    const [validUser, setValidUser] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formPassErrors, setFormPassErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPassSubmitting, setIsPassSubmitting] = useState(false);
    const navigate = useNavigate();
    const checkValidUser = async () => {


        let secret_key = SECRET_PASSWORD
        let secret_app = SECRET_APP
        axios({
            method: 'post',
            url: CHECK_USER_URL,
            data: { 'phone_no': formValues.phone_no, 'SECRET_KEY': secret_key, 'SECRET_APP': secret_app },
        })
            .then(function (response) {
                if (response.data.status === 200) {
                    setValidUser(true)
                } else if (response.data.status === 400) {
                    if (response.data.success) {
                        navigate("/signup", { state: { 'phoneNo': formValues.phone_no } });
                    }
                    else {
                        setFormErrors({ 'phone_no': response.data.error })
                    }
                }
            })
            .catch(function (response) {
                //handle error
                setFormErrors({ 'phone_no': "Please check your internet" })
            });
    }
    const submitForm = async () => {
        let secret_key = SECRET_PASSWORD
        let secret_app = SECRET_APP
        axios({
            method: 'post',
            url: LOGIN_URL,
            data: { 'phone_no': formValues.phone_no, 'password': formPassValues.password, 'secret_key': secret_key, 'secret_app': secret_app },
            // headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem('currentUser', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                    navigate("/");
                }

            })
            .catch(function (response) {
                //handle error
                setFormPassErrors({ password: "Invalid Password" });
            });

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handlePassChange = (e) => {
        const { name, value } = e.target;
        setFormPassValues({ ...formPassValues, [name]: value });
    };


    const handleSubmitTo = (e) => {
        e.preventDefault();
        setFormPassErrors(validatePassword(formPassValues));
        setIsPassSubmitting(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };
    const validate = (values) => {
        let errors = {};
        if (!values.phone_no) {
            errors.phone_no = "Please enter your mobile no";
        }

        return errors;
    };

    const validatePassword = (values) => {
        let errors = {};
        if (!values.password) {
            errors.password = "Please enter your password";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting & !isPassSubmitting) {
            checkValidUser();
        }
        if (Object.keys(formPassErrors).length === 0 && isPassSubmitting) {
            submitForm()
        }

    }, [formErrors, formPassErrors]);

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
            <div className="bg-[#fcfcfc] container py-10 md:mt-20 md:w-[650px] w-full shadow-lg px-5 md:p-20">
                {/* <div className="">
                        <div className="flex gap-2 border-2 border-gray-200 p-2 bg-gray-100  shadow-sm text-center justify-center">
                            <div className="text-red-500 w-6 h-6">
                                <i className="fa-brands fa-google"></i>
                            </div>
                            <div>
                                Log in with Google
                            </div>
                        </div>
                    </div> */}
                {/* <div className="border-b border-gray-400 mt-5 w-full relative">
                        <p
                            className="px-6 absolute bg-[#fcfcfc] -top-3 flex items-center text-center right-[47%] left-[48%] justify-center">
                            Or</p>
                    </div> */}
                <p className="py-5 text-[#7a003c] font-medium">Sign in</p>
                {validUser ?
                    <form className="mt-5" onSubmit={handleSubmitTo} noValidate>

                        <div className="relative">
                            <input type="password"
                                className={`border  rounded-sm p-3 mt-7 border-l-[#7a003c] border-l-2 w-full shadow-sm outline-none text-sm  pl-8 focus:outline-none}${formPassErrors.password && " border-red-500"}`}
                                placeholder="Your password "
                                name='password'
                                id='password'
                                value={formPassValues.password}
                                onChange={handlePassChange}

                            />

                            <i className="fa-solid fa-key absolute top-8 left-2 text-gray-700 mt-2.5"></i>

                            {formPassErrors.password && (
                                <span className=" text-red-500 text-sm">{formPassErrors.password}</span>
                            )}
                        </div>
                        <div className="text-right py-2 text-sm">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                        <button className="text-lg font-medium py-2 mt-5 bg-[#7a003c] w-full text-center text-white rounded-sm shadow-sm" type="submit">Sign In</button>
                        {/* <div className="text-lg font-medium py-2 mt-5 bg-[#7a003c] w-full text-center text-white rounded-sm shadow-sm">

                            <a href="" className=" ">Sign in</a>
                        </div> */}

                        {/* <div className="text-center py-2 text-sm">
                        Don’t have an account?   <span className="text-[#7a003c] font-medium"><Link to="/singup">Sign up</Link></span>
                    </div> */}
                    </form>
                    :
                    <>
                        <form className="mt-5" onSubmit={handleSubmit} noValidate>
                            <div className="text-right py-2 text-sm">
                                <div className="relative">
                                    <input type="text"
                                        className={`border  rounded-sm p-3 border-l-[#7a003c]  border-l-2 w-full shadow-sm outline-none text-sm  pl-8 focus:outline-none}${formErrors.phone_no && " border-red-500"}`}
                                        placeholder="Mobile No"
                                        name='phone_no'
                                        id="phone_no"
                                        value={formValues.phone_no}
                                        onChange={handleChange}
                                        autoFocus={true}
                                    />

                                    <i className="fa-solid fa-envelope-circle-check h-16 absolute top-1 left-2 text-gray-700 mt-2.5"></i>
                                    {formErrors.phone_no && (
                                        <span className="text-red-500 text-sm">{formErrors.phone_no}</span>
                                    )}
                                </div>
                                <Link to="/forgot-password">Forgot password?</Link>
                            </div>
                            <button className="text-lg font-medium py-2 mt-5 bg-[#7a003c] w-full text-center text-white rounded-sm shadow-sm" type="submit">Continue</button>
                        </form>
                    </>
                }


            </div>
        </div>
    )

}

export default Signin