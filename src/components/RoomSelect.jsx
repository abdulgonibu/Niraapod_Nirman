import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import { RatingText } from '../common/Custommethod'
import Image from '../common/Image'
import HotelThumbnail from '../components/HotelThumbnail'
import DatePicker from "react-datepicker";
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select'
import { DISTRICT_URL } from '../constants/api'
import { connect } from "react-redux";
import { HOTEL_RESERVATION_URL } from '../constants/api'
import { SECRET_APP, SECRET_PASSWORD } from '../constants/config'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Facilities from '../components/Facilities';
import ImageFacility from '../components/ImageFacility'
import HotelPopUp from '../components/HotelPopUp'
import { useDispatch } from "react-redux";


import { addNewRoom, removeRoom, increamantAdult, decremantAdults, increamentChilds, decrementChilds, onchangeChildsValue, onExpandRoom } from '../actions/hotelGhuestAction'




const RoomSelect = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(null);
    const [from, setFrom] = useState("");
    const [hotel, setHotel] = useState({});
    const [districts, setDistricts] = useState([]);
    const [hotelPopup, setHotelPopup] = useState(false);
    const ref = useRef(null);
    let [searchParams, setSearchParams] = useSearchParams();
    let check_in_date = searchParams.get('check_in_date')
    let check_out_date = searchParams.get('check_out_date')
    let district = searchParams.get('district')
    let rooms = searchParams.get('rooms')
    const dispatch = useDispatch();




    const onClickSelectRoom = (data) => {
        if (district !== '') {
            data['district'] = district
            data['from'] = location.state
        }
        if (check_in_date !== '') {
            data['check_in_date'] = check_in_date
        }
        if (check_out_date !== '') {
            data['check_out_date'] = check_out_date
        }
        navigate('/hotel-details', { state: data })
    }
    const onClickAddNewRoom = () => {
        dispatch(addNewRoom({ adults: 2, childrens: 0 }))
    }

    const onClickRemoveRoom = (data) => {
        dispatch(removeRoom(data))
    }
    const onClickAddAdults = (data, index) => {
        data['id'] = index
        dispatch(increamantAdult(data))
    }
    const onClickSubtractAdults = (data, index) => {
        data['id'] = index
        dispatch(decremantAdults(data))
    }
    const onClickSubtractChildrens = (data, index) => {
        data['id'] = index
        dispatch(decrementChilds(data))
    }
    const onClickAddChildrens = (data, index) => {
        data['id'] = index
        dispatch(increamentChilds(data))
    }

    const onClickChildSelection = (event, index = 0, childindex = 0) => {
        let data = { child: childindex, id: index, selectedValue: event.target.value }
        dispatch(onchangeChildsValue(data))
    }
    const onclickRoomExpand = (index) => {
        dispatch(onExpandRoom({ index: index }))
    }
    const handleClickOutside = (event) => {

        if (ref.current && !ref.current.contains(event.target)) {
            setHotelPopup(false);
        }
    };



    const onClickRoomBooked = async (hotel, room) => {
        const token = localStorage.getItem('token', '');
        let data = {}
        data['SECRET_KEY'] = SECRET_PASSWORD
        data['SECRET_APP'] = SECRET_APP
        data["check_in_date"] = moment(journeyDate).format('DD-MM-YYYY')
        if (returnDate !== null && returnDate !== '' && returnDate !== undefined) {
            data["check_out_date"] = moment(returnDate).format('DD-MM-YYYY')
        }
        if (from !== null && from === '' && from !== undefined) {
            data["district_to"] = from.value
        }
        data["hotel"] = hotel.id
        data["rooms"] = JSON.stringify([room.id])
        data["adults"] = room.number_of_person
        data["total_amount"] = room.new_price

        const response = await axios.post(HOTEL_RESERVATION_URL, data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        if (response.data) {
            navigate("/order-confirm", { state: { 'reservationID': response.data.id } });
        }

    }
    const handleChangeFrom = (data) => {

        setFrom(data);
    };
    const Disricts = async () => {


        const result = await axios.get(DISTRICT_URL);
        var data = []
        if (result.data.length > 0) {
            for (var i = 0; i < result.data.length; i++) {
                data.push({ 'value': result.data[i].id, 'label': result.data[i].name })
            }
            // setFrom(data[0])

        }
        setDistricts(data)
    }
    useEffect(() => {
        if (location.state !== '' && location.state !== null) {
            if (location.state['from'] !== undefined) {
                setFrom(location.state['from'])
            }
            if (location.state['check_in_date'] !== undefined) {
                let jrdate = new Date(location.state['check_in_date'])
                setJourneyDate(jrdate)
            }
            if (location.state['check_out_date'] !== undefined) {
                let jrdate = new Date(location.state['check_out_date'])
                setReturnDate(jrdate)
            }
            setHotel(location.state)
            Disricts()

        } else {
            navigate("/signin");
        }
    }, []);


    return (
        <div>
            <MobileNav />
            <nav className="md:bg-[#00294d] bg-no-repeat md:pb-5">
                <div className="hidden md:block">
                    <Nav
                        home="Home"
                        Explore="Explore"
                        Help="Help"
                    />
                </div>

            </nav>
            <form action="" className="container mt-2 md:mt-20">
                <div className="grid md:grid-cols-4 grid-cols-2 text-gray-500  text-left">
                    <div className="border border-solid border-gray-300 p-2 md:rounded-l-lg ">
                        <label htmlFor="from" className="text-sm text-slate-500">Destination</label> <br />
                        <Select
                            className=" bg-white w-full block"
                            value={from}
                            onChange={handleChangeFrom}
                            placeholder="To"
                            isSearchable="true"
                            options={districts}
                        >
                        </Select>
                    </div>
                    <div className="border border-l-0  border-solid border-gray-300 p-2 ">
                        <label htmlFor="from" className="text-sm text-slate-500 ">Check in</label> <br />
                        <DatePicker
                            selected={journeyDate} onChange={(date) => setJourneyDate(date)}
                            className=' px-4 py-[6px] focus:outline-none placeholder:text-sm border-gray-300  border rounded w-full date '
                            minDate={moment().toDate()}
                            dateFormat="dd/MM/Y"
                        />
                    </div>
                    <div className="border md:border-l-0 md:border border-t-0 border-solid border-gray-300 p-2  ">
                        <label htmlFor="from" className="text-sm text-slate-500">Check out</label> <br />
                        <DatePicker
                            selected={returnDate} onChange={(date) => setReturnDate(date)}
                            className='px-4 py-[6px] focus:outline-none placeholder:text-sm border rounded  w-full date'
                            minDate={moment().toDate()}
                            dateFormat="dd/MM/Y"
                        />
                    </div>
                    <div className="border border-l-0 border-solid md:border border-t-0 border-gray-300 text-gray-500 md:rounded-r-lg cursor-pointer group relative">
                        <div className="hover:bg-blue-200  p-2 text-gray-700" onClick={() => setHotelPopup(true)}>
                            <label htmlFor="from" className=" text-sm text-slate-500 ">Guests</label>
                            <div className="flex gap-1">
                                <p className="font-semibold">{props.totalRooms} </p><span className=" text-sm"> Room{props.totalRooms <= 1 ? '' : 's'},</span>
                                <p className="font-semibold">{props.totalGuests}</p> <span className=" text-sm">Guest{props.totalGuests <= 1 ? '' : 's'}</span>
                            </div>
                            <div className="flex gap-1">
                                <p className="font-semibold">{props.totalAdults} </p><span className=" text-sm"> Adult{props.totalAdults <= 1 ? '' : 's'}</span>
                                {props.totalChldrens > 0 ?
                                    <>
                                        ,<p className="font-semibold">{props.totalChldrens}</p> <span className=" text-sm">Children{props.totalChldrens <= 1 ? '' : 's'}</span>
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                        {hotelPopup ?
                            <div ref={ref}>
                                <HotelPopUp

                                    list={props.addedHotelGuestItems}
                                    onClickAddNewRoom={() => onClickAddNewRoom()}
                                    onClickRemoveRoom={onClickRemoveRoom}
                                    onClickAddAdults={onClickAddAdults}
                                    onClickSubtractAdults={onClickSubtractAdults}
                                    onClickAddChildrens={onClickAddChildrens}
                                    onClickSubtractChildrens={onClickSubtractChildrens}
                                    onClickChildSelection={onClickChildSelection}
                                    onclickRoomExpand={onclickRoomExpand}
                                // totalGuests={props.totalGuests}
                                // totalRooms={props.totalRooms}
                                // totalChldrens={props.totalChldrens}
                                // totalAdults={props.totalAdults}
                                />
                            </div>
                            : null
                        }


                    </div>
                </div >

                <div className="flex justify-center">
                    <input type="button" value="Search"
                        className="bg-[#fe2b5c] hover:bg-[#2e2e2e] text-slate-50 p-1 py-2 mt-2 px-14 rounded-full transition  font-medium cursor-pointer" />
                </div>
            </form >
            <div className="container py-10 text-left">
                <h1 className="text-xl text-center md:text-left py-2">{hotel.hotel_name}</h1>
                <p className="md:text-sm text-center md:text-left text-xs"> {hotel.address}</p>
                <div className="flex md:flex-row flex-col gap-2 py-5">
                    <div className="basis-30%">

                        {
                            hotel.gallery_images !== undefined && hotel.gallery_images.length > 0 ?
                                <Image
                                    className="h-full w-full"
                                    imagePath={hotel.gallery_images[0].image}
                                />
                                : null
                        }
                    </div>
                    <div className="grid grid-cols-3 gap-2 basis-70%">
                        {hotel.gallery_images !== undefined && hotel.gallery_images.length > 1 ?
                            <HotelThumbnail
                                images={hotel.gallery_images}
                                ignore={0}
                                className="s"
                            /> : null
                        }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between border border-gray-300 p-4 text-gray-600">

                    <Tabs>
                        <TabList className="grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-5 md:mb-0 mb-5">
                            <Tab>Overview</Tab>
                            <Tab>Rooms</Tab>
                            <Tab>Facilities</Tab>
                            <Tab>Reviews</Tab>

                        </TabList>

                        <TabPanel>
                            <div className='overview-show'>
                                <div className="flex md:flex-row flex-col gap-2">
                                    <div className="basis-[75%]  ">
                                        <div className="border border-gray-300 mt-5">

                                            {hotel.hotel_surroundings_info !== '' && hotel.hotel_surroundings_info !== 'null' && hotel.hotel_surroundings_info !== null ?
                                                <>
                                                    <h1 className="pl-5 py-2 text-lg font-bold text-left">Hotel Surrounding</h1>
                                                    <div className="grid md:grid-cols-5 p-2 gap-5 pl-5 mt-3 md:mt-0">
                                                        <ImageFacility
                                                            data={hotel.hotel_surroundings_info}
                                                            image={"/assets/images/vector/frame.png"}
                                                            className={"flex md:flex-wrap md:items-center md:justify-center md:flex-col gap-2 text-center space-y-2"}
                                                            imageClass={"w-5"}
                                                            textClass={"md:text-sm text-xs"}
                                                        />
                                                    </div>
                                                </> : null
                                            }
                                        </div>


                                        <div className="border border-gray-300  my-5">
                                            <p className="m-2 text-sm text-justify">{hotel.description}</p>
                                        </div>
                                    </div>
                                    <div className="basis-[25%] border border-gray-300 my-5">
                                        <div className="text-center p-1 px-3 basis-[30%]">
                                            <div className=" flex justify-between px-2">
                                                <h4 className="text-[#450303] text-lg font-medium">{RatingText(hotel.ratings)}</h4>
                                                <div className="relative">
                                                    <img src="assets/images/resort/Union.png" className=" " alt="" />
                                                    <p className="absolute top-1 text-sm ">{hotel.ratings}</p>
                                                </div>
                                            </div>
                                            {hotel.hotel_reviews !== undefined ?
                                                <p className="text-[12px] text-gray-400 flex justify-start text-left pl-2">
                                                    {hotel.hotel_reviews.length < 2 ? hotel.hotel_reviews.length + ' ' + 'review' : hotel.hotel_reviews.length + ' ' + 'reviews'}
                                                </p> : null
                                            }
                                            {/* <p className="border-2 p-[2px] border-gray-300 rounded-md text-gray-500 mr-20 my-2 font-normal">
                                    Housekeeping
                                    <span className="text-[#49d3ff] text-sm ml-1">201</span> <i
                                        className="fa-solid fa-thumbs-up text-[#49d3ff]"></i>
                                </p>
                                <p className="border-2 p-[2px] border-gray-300 rounded-md text-gray-500 mr-20 mb-2 font-normal">
                                    Food & Dining
                                    <span className="text-[#49d3ff] text-sm ml-1">201</span> <i
                                        className="fa-solid fa-thumbs-up text-[#49d3ff]"></i>
                                </p>

                                <p
                                    className="border-2 p-[2px] border-gray-300 rounded-md text-left text-gray-500 mr-[60px] mb-2 font-normal">
                                    Children’s Activity
                                    <span className="text-[#49d3ff] text-sm ml-1">201</span> <i
                                        className="fa-solid fa-thumbs-up text-[#49d3ff]"></i>
                                </p>

                                <p className="border p-1 border-gray-300 rounded-md text-gray-500 text-left  font-normal">
                                    Had a great experience.<br />
                                    <span className="text-sm">Tamanna - 5 May 2022</span>

                                </p> */}

                                        </div>
                                    </div>
                                </div>

                                {/* <div className="flex flex-col md:flex-row gap-2">
                    <div className="basis-[75%]">
                        <div className=" rounded-sm border border-gray-400">
                            <ul className="flex justify-between px-10 items-center text-center p-2 border-b border-gray-400">
                                <li><a href="">Staff Vaccination</a></li>
                                <li><a href="">Hygiene plus</a></li>
                            </ul>
                            <div>
                                <p className="ml-10 text-gray-700 my-2">This property has self-selected and self-certified the
                                    following
                                    hygiene
                                    measures.Learn
                                    more</p>
                                <div className="mx-10 border border-gray-400 flex flex-col md:flex-row gap-1 mb-5 rounded p-2">
                                    <div className='text-center flex items-center justify-center'>
                                        <img src="assets/images/vector/emojione-monotone_syringe.png" alt="" className='h-20 md:w-full md:h-full w-20  ' />
                                    </div>
                                    <div className="">
                                        <h1 className="md:text-lg font-medium py-1">100% of staff fully vaccinated</h1>
                                        <p className='text-justify text-xs'>100% of on-site staff have received all necessary vaccination shots for COVID-19.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-sm border border-gray-400 mt-5">
                            <p className='text-center md:text-left md:text-base text-sm p-2 md:p-0'>This property has self-selected and self-certified the following hygiene measures.Learn more</p>
                            <div className="grid md:grid-cols-3 gap-10 p-5">
                                <div className="bg-gray-200 flex gap-3 p-3 rounded-md">
                                    <img src="assets/images/vector/1 (1).png" className="w-6 h-6 mt-3" alt="" />
                                    <div>
                                        <p className="font-semibold">Safety Features</p>
                                        <div className="flex gap-1 py-1">
                                            <span className="text-green-300"><i className="fa-solid fa-check"></i></span>
                                            <p className="text-xs ">
                                                Staff trained in
                                                safety
                                                protocol</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 flex gap-3 p-3 rounded-md">
                                    <img src="assets/images/vector/1 (3).png" className="w-6 h-6 mt-3" alt="" />
                                    <div>
                                        <p className="font-semibold text-sm">Preventative Equipment</p>
                                        <div className="flex gap-1 pt-1 text-xs">
                                            <span className="text-green-300"><i className="fa-solid fa-check"></i></span>
                                            <p className="text-sm ">
                                                Hand sanitizer

                                            </p>
                                        </div>
                                        <div className="flex gap-1 ">
                                            <span className="text-green-300"><i className="fa-solid fa-check"></i></span>
                                            <p className="text-sm ">
                                                Free face masks</p>
                                        </div>
                                        <div className="flex gap-1 ">
                                            <span className="text-green-300"><i className="fa-solid fa-check"></i></span>
                                            <p className="text-sm ">
                                                Sterilizing equipment</p>
                                        </div>

                                    </div>

                                </div>
                                <div className="bg-gray-200 flex gap-3 p-3 rounded-md">
                                    <img src="assets/images/vector/1 (2).png" className="w-6 h-6 mt-3" alt="" />
                                    <div>
                                        <p className="font-semibold">Health and Medical</p>
                                        <div className="flex gap-1 pt-1 text-xs">
                                            <span className="text-green-300"><i className="fa-solid fa-check"></i></span>
                                            <p className="text-xs ">   First aid kit
                                            </p>


                                        </div>
                                        <div className="flex gap-1 ">
                                            <span className="text-green-300"><i className="fa-solid fa-check"></i></span>
                                            <p className="text-xs">
                                                Doctor/nurse on call</p>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="rounded-sm border border-gray-400 py-4 mt-2 px-5">
                            <h2 className='text-center pb-2 md:text-left md:pb-0'>Facilities</h2>

                            <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
                                
                                {hotel.facilities!==undefined && hotel.facilities!=='' && hotel.facilities.map((facility,index)=>(
                                    <div className="flex gap-1 py-1" key={index}>
                                        <span className="text-xs"><i className="fa-solid fa-check"></i></span>
                                        <p className="text-xs ">
                                        {facility.text}</p>
                                    </div>
                                    ))}
                            
                            </div>
                        </div>
                    </div>
                    <div className="basis-[25%] border border-gray-300 ">
                        <div className="m-2">
                            <img src="assets/images/googleMap.jpg" alt="" />

                        </div>

                        <div className="flex gap-3 m-2">
                            <p className="border w-8 h-8 text-center flex items-center justify-center rounded-full mt-1">8.1</p>

                            <div className="">
                                <p className="font-medium">Excelent</p>
                                <p className="text-xs">Location rating score</p>
                            </div>

                        </div>
                        <div className="p-2 flex gap-2 ">
                            <i className="fa-solid fa-location-dot text-gray-500"></i>
                            <p className="font-medium text-sm">Excelent Location</p>
                        </div>
                        <div className="border-b-2 border-gray-400 mx-2">
                        </div>
                        <div className="m-2 flex justify-between">
                            <div className="flex gap-2">
                                <i className="fa-solid fa-car text-sm text-gray-500 mt-1"></i>
                                <p className="text-sm text-gray-500">Parking </p>
                            </div>
                            <div>
                                <p className="text-green-500">Free</p>
                            </div>

                        </div>
                        <div className="border-b-2 border-gray-400 mx-2">
                        </div>
                        <div className="m-2 text-gray-600">
                            <h5 className="font-medium">Popular landmarks</h5>
                            <div className="flex justify-between mb-1 mt-1 text-xs">
                                <p>Contrary to popular belief</p>
                                <p>301 m</p>
                            </div>
                            <div className="flex justify-between mb-1 text-xs">
                                <p>Contrary to popular belief</p>
                                <p>151 m</p>
                            </div>
                            <div className="flex justify-between mb-1 text-xs">
                                <p>Contrary to popular belief</p>
                                <p>254 m</p>
                            </div>
                            <div className="flex justify-between mb-1 text-xs">
                                <p>Contrary to popular belief</p>
                                <p>236 m</p>
                            </div>
                            <div className="flex justify-between mb-1 text-xs">
                                <p>Location name</p>
                                <p>321 m</p>
                            </div>

                        </div>

                    </div>
                </div> */}

                            </div>
                        </TabPanel>
                        <TabPanel>

                            <div className='room-show'>
                                {hotel.hotel_room !== undefined ?
                                    <h2 className="py-3 text-gray-700">{hotel.hotel_room.length < 2 ? hotel.hotel_room.length + ' room found ' : hotel.hotel_room.length + ' rooms found '}</h2>
                                    : null
                                }
                                <div className="">
                                    {hotel.hotel_room !== undefined ?
                                        <>
                                            {
                                                hotel.hotel_room.map((room, index) => (
                                                    <>
                                                        <div className="flex flex-col md:flex-row md:border-l border  md:border-b border-gray-400">
                                                            <div className="basis-[15%] w-full p-2" >

                                                                <div className="grid grid-cols-2 gap-1 mt-1 mb-2 md:mb-0">
                                                                    <Image

                                                                        className=""
                                                                        imagePath={room.image}
                                                                    />
                                                                </div>
                                                                <p className="text-xs text-green-300 text-center">{room.room_name}</p>


                                                            </div>
                                                            <div className="basis-[85%] w-full">
                                                                <div className="flex flex-col md:flex-row shadow">
                                                                    <div className="border-l border-b  border-gray-400 basis-[35%] ">

                                                                        <p className="bg-gray-100  p-2 rounded-sm  border-b border-gray-400 w-full">Facilities</p>
                                                                        {room.facilities !== '' ?
                                                                            <div className="p-2">
                                                                                <p className="bg-[#ff9c00] p-2 text-white text-sm">Lowest price available!</p>
                                                                                <p>Your price includes:</p>
                                                                                <Facilities
                                                                                    data={room.facilities !== '' ? room.facilities : {}}
                                                                                    icon={'fa-solid fa-check'}
                                                                                    className={'my-5'}
                                                                                />

                                                                            </div>
                                                                            : null
                                                                        }


                                                                    </div>

                                                                    <div className="border-l border-b border-gray-400 basis-[10%] text-center">
                                                                        <p className="bg-gray-100   p-2 rounded-sm  border-b border-gray-400 w-full">Guests</p>
                                                                        <div className="flex justify-center items-center text-center p-2">
                                                                            <img src="assets/images/vector/4.png" className="h-5  " alt="" />{room.number_of_person} adults {room.number_of_children > 0 ? ',' + room.number_of_children + " Childrens" : null}
                                                                        </div>

                                                                    </div>
                                                                    <div className="border-l border-b border-gray-400 basis-[20%] text-center">
                                                                        <p className="bg-gray-100  p-2 rounded-sm  border-b border-gray-400 w-full">Price per night</p>

                                                                        <div className="text-center">
                                                                            <del>BDT {room.price.toLocaleString()}</del>
                                                                            <h1 className="font-bold">BDT {room.new_price.toLocaleString()}</h1>
                                                                            <p className="text-xs  md:text-right bg-red-500 md:ml-16 mt-5 text-white">

                                                                                {room.discount_type > 0 && room.discount_amount !== null ?
                                                                                    <>
                                                                                        {room.discount_type === 1 ?
                                                                                            'SAVE ' + room.discount_amount + ' %' : 'SAVE ' + room.discount_amount + ' TK'}
                                                                                        TODAY
                                                                                    </> : null
                                                                                }
                                                                            </p>
                                                                        </div>

                                                                    </div>

                                                                    <div className="border-l border-b border-r-0 border-gray-400 basis-[15%]">
                                                                        <p className="bg-gray-100  p-2 rounded-sm border-b border-gray-400 w-full text-center md:text-right">Most
                                                                            Booked</p>
                                                                        <div className="flex items-center justify-center py-8">
                                                                            <p className="bg-gray-300 rounded-sm p-1 text-center w-10 h-8">1</p>

                                                                        </div>
                                                                    </div>
                                                                    <div className="border-r border-b border-gray-400 basis-[20%] relative">
                                                                        <p className="bg-gray-100  p-5 rounded-sm  border-b border-gray-400 w-full"></p>
                                                                        <div className="flex justify-center p-10 border-l border-gray-400">

                                                                            <div className=" p-3 space-y-10">
                                                                                <div className="bg-[#4b81fb] p-3 text-white px-8 rounded-sm border border-[#4b81fb]">
                                                                                    <button onClick={() => onClickRoomBooked(hotel, room)}>Reserve</button>


                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                            <br />

                                                        </div>
                                                    </>
                                                ))}
                                        </>
                                        : null
                                    }
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-5 facilities-show ">
                                <div className="grid md:grid-cols-3 gap-5">
                                    <div>
                                        {hotel.facilities !== '' && hotel.facilities !== 'null' && hotel.facilities !== null ?
                                            <>
                                                <h3 className="font-semibold">Hotel Facilites</h3>
                                                <ImageFacility
                                                    data={hotel.facilities}
                                                />
                                            </> : null
                                        }
                                    </div>
                                    <div>
                                        {hotel.service_convenience !== '' && hotel.service_convenience !== 'null' && hotel.service_convenience !== null ?
                                            <>
                                                <h3 className="font-semibold">Services and conveniences
                                                </h3>
                                                <ImageFacility
                                                    data={hotel.service_convenience}
                                                />
                                            </>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            No Reviews Yet
                        </TabPanel>

                    </Tabs>
                    {/* <ul className="grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-5 md:mb-0 mb-5">
                    <li className='overview cursor-pointer' >Overview</li>
                    <li className='room cursor-pointer'>Rooms</li>
                    <li className='facilities cursor-pointer'>Facilities</li>
                    <li><a href="">Reviews</a></li>
                    <li><a href="">Policies</a></li>
                </ul> */}
                    <ul className="flex flex-col md:flex-row gap-5 md:gap-10 md:items-start  items-center  justify-center">
                        <div className="flex gap-1 md:text-base text-2xl">
                            <img src="assets/images/bangladesh-taka-currency-symbol-vector-30023410.jpg" className="w-5 h-5" alt="" />
                            <p>{hotel.hotel_room !== undefined && hotel.hotel_room.length > 0 ? hotel.hotel_room[0].new_price.toLocaleString() : null}</p>
                        </div>

                        {/* <li className='text-center bg-[#4b81fb] p-1 py-1 cursor-pointer  text-sm md:text-normal px-4 rounded text-white viewDeal'>View This Deal</li> */}
                    </ul>

                </div>







            </div>
        </div>
    );

}
const mapStateToProps = (state) => {
    return {
        totalGuests: state.hotelghuest.totalGuests,
        totalChldrens: state.hotelghuest.totalChldrens,
        totalAdults: state.hotelghuest.totalAdults,
        totalRooms: state.hotelghuest.totalRooms,
        addedHotelGuestItems: state.hotelghuest.addedHotelGuestItems,
    }
}


export default connect(
    mapStateToProps,
    {}
)(RoomSelect);
