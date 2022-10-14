
import React, { useEffect, useState, useRef } from "react";
import Select from 'react-select'
import moment from 'moment';
import DatePicker from "react-datepicker";
import { DISTRICT_URL } from '../constants/api'
import axios from "axios";
import HotelPopUp from '../components/HotelPopUp'
import { connect } from "react-redux";
import { addNewRoom, removeRoom, increamantAdult, decremantAdults, increamentChilds, decrementChilds, onchangeChildsValue, onExpandRoom } from '../actions/hotelGhuestAction'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MomentDateConvertion } from '../common/Custommethod'

const HotelSearch = (props) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [districts, setDistricts] = useState([]);
    const [from, setFrom] = useState("");
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(null);
    const [hotelPopup, setHotelPopup] = useState(false);
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setHotelPopup(false);
        }
    };

    const hotelSearchClick = () => {
        var check_in = "", check_out = "", roomString = ''
        for (let i = 0; i < props.addedHotelGuestItems.length; i++) {
            let adults = props.addedHotelGuestItems[i].adults
            let childrens = props.addedHotelGuestItems[i].childrens
            roomString += 'r,' + adults.toString() + ',' + childrens.toString() + ','
        }
        if (roomString !== '') {
            roomString = roomString.slice(0, -1)
        }
        if (journeyDate) {
            check_in = MomentDateConvertion(journeyDate)
        }
        if (returnDate) {
            check_out = MomentDateConvertion(returnDate)
        }
        let url = "?district=" + from.value + "&check_in_date=" + check_in + '&check_out_date=' + check_out + '&rooms=' + roomString
        navigate("/hotel-search" + url, { state: from });
    };
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
    const handleChangeFrom = (data) => {
        // alert(JSON.stringify(data))
        setFrom(data);
    };
    const Disricts = async () => {


        const result = await axios.get(DISTRICT_URL);
        var data = []
        if (result.data.length > 0) {
            for (var i = 0; i < result.data.length; i++) {
                data.push({ 'value': result.data[i].id, 'label': result.data[i].name })
            }
            setFrom(data[0])

        }
        setDistricts(data)
    }
    useEffect(() => {
        Disricts()
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, [])

    return (

        <div className={`bg-white shadow-lg text-black md:px-10 px-3  mx-auto py-2  rounded-b-lg text-left}${props.display ? '' : ' hidden'}`} >
            <form action="" className="  ">
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
                    <input type="button" value="Search" onClick={() => hotelSearchClick()}
                        className="bg-[#fe2b5c] hover:bg-[#2e2e2e] text-slate-50 p-1 py-2 mt-2 px-14 rounded-full transition  font-medium cursor-pointer" />
                </div>


            </form >
        </div >
    )


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
)(HotelSearch);