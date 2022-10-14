import React, { useEffect, useState } from "react";
import axios from "axios";
import { DISTRICT_URL, VEHICLE_TYPE_URL } from '../constants/api'
import VehicleTypes from '../common/VehicleTypes'
import DatePicker from "react-datepicker";
import Select from 'react-select'
import moment from 'moment';
import { MomentDateConvertion } from '../common/Custommethod'
import { useNavigate } from "react-router-dom";

const VehicleSearch = ({ display }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [districts, setDistricts] = useState([]);
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [trip, setTrip] = useState('1');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicletypes, setVehicleTypes] = useState([]);
    const navigate = useNavigate();

    const getVehicleTypes = async () => {
        const result = await axios.get(VEHICLE_TYPE_URL);

        if (result.data.length > 0) {
            setVehicleTypes(result.data);
            setVehicleType(result.data[0].id)
        }
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
    const onChangeTrip = e => {
        setTrip(e.target.value)

    }
    const onChangeVehicleType = e => {
        setVehicleType(e.target.value)

    }
    const handleChange = (data) => {
        setFrom(data);
    };
    const handleChangeTo = (data) => {
        setTo(data);
    };


    const vehicleSearchClick = () => {
        var check_in = "", check_out = ""

        if (journeyDate) {
            check_in = MomentDateConvertion(journeyDate)
        }
        if (returnDate) {
            check_out = MomentDateConvertion(returnDate)
        }
        let url = "?from=" + from.value + "&to=" + to.value + "&check_in_date=" + check_in + '&check_out_date=' + check_out + '&trip=' + trip + '&vehicle=' + vehicleType
        navigate("/vehicle-select" + url);
        // window.location.href = "/vehicle-select";

    };

    useEffect(() => {
        Disricts()
        getVehicleTypes()
    }, [])


    return (
        <div className={`bg-white shadow-xl rounded-b text-black px-3 md:px-10 py-2 mx-auto text-left}${display ? '' : ' hidden'}`}>
            <form action="" className="bg-gray-50  mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-6 mx-auto text-left bg-white">
                    <div className="border border-solid border-b-0 md:border-b border-gray-300 p-2 md:rounded-l w-full">
                        <label htmlFor="from" className="text-sm text-slate-500">From</label> <br />
                        <Select
                            className=" bg-white w-full block"
                            value={from}
                            onChange={handleChange}
                            isSearchable="true"
                            placeholder="From"
                            options={districts}
                        // hideSelectedOptions={false}
                        >
                        </Select>
                    </div>
                    <div className="border border-b-0 md:border-b border-l-0 border-solid border-gray-300 p-2 w-full">
                        <label htmlFor="from" className="text-sm text-slate-500">To</label> <br />
                        <Select
                            className=" bg-white w-full block"
                            value={to}
                            onChange={handleChangeTo}
                            placeholder="To"
                            isSearchable="true"
                            options={districts}
                        >
                        </Select>
                    </div>
                    <div className="border border-b-0 md:border-b border-r-0 md:border-r  md:border-l-0 border-solid border-gray-300 p-2 w-full">
                        <label htmlFor="from" className="text-sm text-slate-500">Trip</label> <br />
                        <select name="trip_type" className="bg-white w-full py-[7px] border border-gray-300 rounded" onChange={(e) => onChangeTrip(e)}>
                            <option value="1">One Way</option>
                            <option value="2">Return</option>
                        </select>
                    </div>
                    <div className="border border-b-0 md:border-b md:border-l-0 border-solid border-gray-300 p-2 w-full">
                        <label htmlFor="from" className="text-sm text-slate-500 ">Journey To Date</label>
                        <DatePicker
                            selected={journeyDate} onChange={(date) => setJourneyDate(date)}
                            className=' px-4 py-[6px] bg-white focus:outline-none placeholder:text-sm border border-gray-300 rounded w-full date'
                            minDate={moment().toDate()}
                            dateFormat="dd/MM/Y"
                        />

                        {/* <input type="text" value="06/07/2022"
                className="datepicker px-4 py-[1px] focus:outline-none placeholder:text-sm border rounded-md w-full date" /> */}
                    </div>

                    <div className="border md:border-l-0 border-solid border-gray-300 p-2 w-full">
                        <label htmlFor="from" className="text-sm text-slate-500">Return Date</label>
                        <DatePicker
                            selected={returnDate} onChange={(date) => setReturnDate(date)}
                            className=' px-4 py-[6px] bg-white border-gray-300 focus:outline-none placeholder:text-sm border rounded w-full date'
                            minDate={moment().toDate()}
                            dateFormat="dd/MM/Y"
                        />


                    </div>
                    <div className="border border-l-0 border-solid border-gray-300 p-2 bg-white  md:rounded-r-lg">
                        <label htmlFor="from" className=" text-sm text-slate-500 ">Vehicle Type</label>
                        <br />
                        <select name="vehicle_type" className="border bg-white border-gray-300 w-full rounded py-[7px]" onChange={(e) => onChangeVehicleType(e)} value={vehicleType}>
                            {vehicletypes.length > 0 && vehicletypes.map((vehicle, index) => (
                                <option value={vehicle.id} key={index} >{vehicle.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center bg-white">
                    <input type="button" value="Search" onClick={() => vehicleSearchClick()}
                        className="bg-[#fe2b5c] hover:bg-[#2e2e2e] text-slate-50 p-1 py-2 mt-2 px-14 rounded-full transition  font-medium cursor-pointer" />
                </div>

            </form>

        </div>
    )


}

export default VehicleSearch