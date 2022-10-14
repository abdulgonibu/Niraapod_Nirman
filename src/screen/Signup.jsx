import React, { useEffect, useState } from "react";
import {  Link,useLocation,useNavigate } from "react-router-dom";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import axios from "axios";
import {SECRET_APP,SECRET_PASSWORD} from '../constants/config'
import { USER_REGISTER_URL } from "../constants/api"



const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [phoneNO, setphoneNO] = useState('');
    const intialValues = { first_name:'',last_name:'',email:'',password: '',conf_password:'',terms_agree:false};
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = async () => {
        let secret_key=SECRET_PASSWORD
        let secret_app=SECRET_APP
        axios({
            method: 'post',
            url: USER_REGISTER_URL,
            data: {'first_name':formValues.first_name,
            password:formValues.password,
            email:formValues.email,
            last_name:formValues.last_name,
            phone_no:phoneNO,
            'SECRET_KEY':secret_key,
            'SECRET_APP':secret_app},
            // headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              if(response.status===200){   
                if (response.data.status===400){
                    setFormErrors({phone_no:response.data.error});
                }else{
                    localStorage.setItem('currentUser', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                    navigate("/");    
                }
              }
            //   else{
            //     setFormErrors({phone_no:"Network Error"});
            //   }
            
            })
            .catch(function (response) {
              //handle error
              setFormErrors({phone_no:"Network Error"});
            });
   
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();      
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };
    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.first_name) {
            errors.first_name = "Please enter your first name";
        }
        if (!values.last_name) {
            errors.last_name = "Please enter your last name";
        }
        if (values.email &&  !regex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Please enter your password";
        } 
        if (!values.conf_password) {
            errors.conf_password = "Please enter confirm password";
        } 
        if (values.password!==values.conf_password) {
            errors.conf_password = "Please password didnot match";
        } 
        
        if (!values.terms_agree) {
            errors.terms_agree = " Not check";
        } 

        return errors;
    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
        
        if(location.state !==null  && location.state.phoneNo!==''){
            setphoneNO(location.state.phoneNo)
        }else{
            navigate("/signin");       
        }

    }, [formErrors]);
  
    
        return (
            <div>
                <MobileNav />

                <div>
                    <nav className="bg-[#00294d]">
                        <div className="hidden md:block">
                            <Nav
                                home="Home"
                                Explore="Explore"
                                Help="Help"
                            />
                        </div>
                    </nav>

                    <div className="bg-[#fcfcfc] container md:mt-20 md:w-[650px] shadow-lg p-10 md:p-20">
                        <form className="md:mt-5" onSubmit={handleSubmit} noValidate>
                            <p className="md:py-5 text-[#7a003c] font-medium">Sign Up</p>
                            <div className="space-y-4">
                                <div className="relative">

                                    <input type="text"
                                        className={`border border-gray-200 rounded-sm p-3 border-l-[#7a003c] border-l-2 w-full shadow-sm outline-none text-sm  pl-8 focus:outline-none}${formErrors.first_name && " border-red-500"}`}
                                        placeholder="First Name" name='first_name' onChange={handleChange}/>
                                    <i className="fa-solid fa-user absolute top-1 left-2 mt-2.5 text-gray-400"></i>
                                    {formErrors.first_name && (
                                        <span className=" text-red-500 text-sm">{formErrors.first_name}</span>
                                    )}
                                </div>
                                <div className="relative">

                                <input type="text"
                                    className={`border border-gray-200 rounded-sm p-3 border-l-[#7a003c] border-l-2 w-full shadow-sm outline-none text-sm  pl-8 focus:outline-none}${formErrors.last_name && " border-red-500"}`}
                                    placeholder="Last Name" name='last_name' onChange={handleChange}/>
                                <i className="fa-solid fa-user absolute top-1 left-2 mt-2.5 text-gray-400"></i>
                                {formErrors.last_name && (
                                        <span className=" text-red-500 text-sm">{formErrors.last_name}</span>
                                    )}
                                </div>
                                <div className="relative">

                                    <input type="text"
                                        className="border border-gray-200 rounded-sm p-3 border-l-[#7a003c] border-l-2 w-full shadow-sm outline-none text-sm  pl-8 focus:outline-none"
                                        placeholder="Mobile " value={phoneNO} disabled={true}/>
                                    <i className="fa-solid fa-phone absolute top-1 left-2 mt-2.5 text-gray-400"></i>
                                    {formErrors.phone_no && (
                                        <span className=" text-red-500 text-sm">{formErrors.phone_no}</span>
                                    )}
                                </div>
                                <div className="relative">

                                    <input type="text"
                                        className={`border border-gray-200 rounded-sm p-3 border-l-[#7a003c] border-l-2 w-full shadow-sm outline-none text-sm  pl-8 focus:outline-none${formErrors.email && " border-red-500"}`}
                                        placeholder="Email(Optional)" 
                                        onChange={handleChange}
                                        name='email'
                                        />

                                    <i className="fa-solid fa-envelope-circle-check h-16 absolute text-gray-400 top-1 left-2 mt-2.5"></i>
                                    {formErrors.email && (
                                        <span className=" text-red-500 text-sm">{formErrors.email}</span>
                                    )}
                                </div>

                                <div className="relative">
                                    <input type="password"
                                        className={`border border-gray-200 rounded-sm p-3  border-l-[#7a003c] border-l-2 w-full shadow-sm text-sm  pl-8 focus:outline-none${formErrors.password && " border-red-500"}`}
                                        placeholder="Your password " 
                                        onChange={handleChange}
                                        name="password"
                                        />

                                    <i className="fa-solid fa-key absolute top-1 left-2 mt-2.5 text-gray-400"></i>
                                    {formErrors.password && (
                                        <span className=" text-red-500 text-sm">{formErrors.password}</span>
                                    )}

                                </div>
                                <div className="relative">
                                    <input type="password"
                                        className={`border border-gray-200 rounded-sm p-3  border-l-[#7a003c] border-l-2 w-full shadow-sm text-sm  pl-8 focus:outline-none${formErrors.conf_password && " border-red-500"}`}
                                        placeholder="Confirm your password   " 
                                        onChange={handleChange}
                                        name="conf_password"
                                        />

                                    <i className="fa-solid fa-key absolute top-1 left-2 mt-2.5 text-gray-400"></i>
                                    {formErrors.conf_password && (
                                        <span className=" text-red-500 text-sm">{formErrors.conf_password}</span>
                                    )}

                                </div>

                                <div className={`flex gap-2 mt-5 ${formErrors.terms_agree && " border border-red-500"}`}>
                                    <input type="checkbox" name="terms_agree" id="" className="mt-1"  onChange={handleChange}/>
                                    <p className={formErrors.terms_agree && " text-red-500"}>I agree to the Terms  Conditions</p>
                                </div>
                               
                                <button className="text-lg font-medium py-2 mt-5 bg-[#7a003c] w-full text-center text-white rounded-sm shadow-sm" type="submit">Register</button>

                                <div className="text-center py-2">
                                    Already have an account? <span className="text-[#7a003c] font-medium"> <Link to="/signin">Sign in</Link></span>
                                </div>

                            </div>

                        </form>


                    </div>

                </div>
            </div>
        )
    
}

export default Signup