

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { DISTRICT_URL } from '../constants/api'
import Select from 'react-select'
import axios from "axios";
import { MomentDateConvertion } from '../common/Custommethod'
import { useNavigate } from "react-router-dom";

const DestinationSearch = ({ display }) => {
    const navigate = useNavigate();
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState();
    const [districts, setDistricts] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [trip, setTrip] = useState('1');

    const handleChange = (data) => {
        setFrom(data);
    };

    const handleChangeTo = (data) => {
        setTo(data);
    };
    const onChangeTrip = e => {
        setTrip(e.target.value)

    }
    const Disricts = async () => {
        const result = await axios.get(DISTRICT_URL);
        var data = []
        if (result.data.length > 0) {
            for (var i = 0; i < result.data.length; i++) {
                data.push({ 'value': result.data[i].id, 'label': result.data[i].name })

            }

        }
        setDistricts(data)
        if (data.length > 0) {
            setFrom(data[0]);
            setTo(data[data.length - 1]);
        }
    }

    useEffect(() => {
        Disricts()

    }, [])


    const destinationSearchClick = () => {
        var check_in = "", check_out = ""

        if (journeyDate) {
            check_in = MomentDateConvertion(journeyDate)
        }
        if (returnDate) {
            check_out = MomentDateConvertion(returnDate)
        }
        let url = "?from=" + from.value + "&to=" + to.value + "&check_in_date=" + check_in + '&check_out_date=' + check_out + '&trip=' + trip
        navigate("/destination-search" + url);
        // window.location.href = "/vehicle-select";
    };

    return (
        <div className={`bg-white shadow text-black px-3 md:px-10 py-2 rounded-b-xl mx-auto destination-list}${display ? '' : ' hidden'}`}>
            <form action="" className="mx-auto ">
                <div className="grid grid-cols-2 md:grid-cols-5 mx-auto text-left ">
                    <div className="border border-b-0 md:border-b border-solid border-gray-300 p-2 md:rounded-l w-full grid">
                        <label htmlFor="from" className="text-sm text-slate-500">From</label>
                        <Select
                            className="w-full block"
                            value={from}
                            onChange={handleChange}
                            isSearchable="true"
                            placeholder="From"
                            options={districts}
                        // hideSelectedOptions={false}
                        >
                        </Select>
                    </div>
                    <div className="border border-b-0 md:border-b border-l-0 border-solid border-gray-300 p-2 w-full grid">
                        <label htmlFor="from" className="text-sm text-slate-500">To</label>

                        <Select
                            className="  w-full block"
                            value={to}
                            onChange={handleChangeTo}
                            placeholder="To"
                            isSearchable="true"
                            options={districts}
                        >
                        </Select>
                    </div>

                    <div className="border border-b-0 col-span-2 md:col-span-1 md:border-b  border-r  md:border-l-0 border-solid border-gray-300 p-2 w-full">
                        <label htmlFor="from" className="text-sm text-slate-500">Trip</label> <br />
                        <select name="trip_type" className=" w-full py-[7px] border border-gray-300 rounded" onChange={(e) => onChangeTrip(e)}>
                            <option value="1">One Way</option>
                            <option value="2">Return</option>
                        </select>
                    </div>
                    <div className="border md:border-l-0 border-b-0 md:border-b border-solid border-gray-300 p-2 w-full">
                        <label htmlFor="from" className="text-sm text-slate-500 ">Journey To Date</label>
                        <DatePicker
                            selected={journeyDate} onChange={(date) => setJourneyDate(date)}
                            className=' px-4 py-[6px] focus:outline-none placeholder:text-sm border-gray-300 border rounded w-full date'
                        />

                        {/* <input type="text" value="06/07/2022"
                className="datepicker px-4 py-[1px] focus:outline-none placeholder:text-sm border rounded-md w-full date" /> */}
                    </div>

                    <div className="border md:border-l-0 border-solid border-gray-300 p-2 w-full">
                        <label htmlFor="from" className="text-sm text-slate-500">Return Date</label>
                        <DatePicker
                            selected={returnDate} onChange={(date) => setReturnDate(date)}
                            className=' px-4  focus:outline-none placeholder:text-sm border border-gray-300 rounded w-full date py-[6px]'
                            placeholderText="Return Date"
                        />


                    </div>
                    {/* <div className="border border-l-0 border-solid border-gray-300 p-2 w-full  md:rounded-r-lg">
                        <label htmlFor="from" className=" text-sm text-slate-500 ">Traveler</label>
                        <br />
                        <select name="" className="border border-gray-300 w-full py-2 rounded">
                            <option value="">3 Traveler</option>
                            <option value="">4 Traveler</option>
                        </select>
                    </div> */}
                </div>

                <div className="flex justify-center">
                    <input type="button" value="Search"
                        onClick={() => destinationSearchClick()}
                        className="bg-[#fe2b5c] hover:bg-[#2e2e2e] text-slate-50 p-1 py-2 mt-2 px-14 rounded-full transition  font-medium cursor-pointer" />
                </div>

            </form>
        </div>
    )
}

export default DestinationSearch