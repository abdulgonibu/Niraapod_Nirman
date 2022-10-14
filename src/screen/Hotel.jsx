import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation, } from "react-router-dom";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import axios from 'axios';
import { HOTEL_URL, DISTRICT_URL } from '../constants/api'
import Select from 'react-select'
import Image from '../common/Image'
import HotelThumbnail from '../components/HotelThumbnail'
import { RatingText } from '../common/Custommethod'
import ContentLoader from 'react-content-loader'
import { connect } from "react-redux";
import HotelPopUp from '../components/HotelPopUp'
import { addNewRoom, removeRoom, increamantAdult, decremantAdults, increamentChilds, decrementChilds, onchangeChildsValue, onExpandRoom } from '../actions/hotelGhuestAction'
import { useDispatch } from "react-redux";
import moment from 'moment';
import { Rating } from 'react-simple-star-rating'
import DatePicker from "react-datepicker";
import { Slider } from "@material-ui/core";

const Hotel = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [hotelPopup, setHotelPopup] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();
    let check_in_date = searchParams.get('check_in_date')
    let check_out_date = searchParams.get('check_out_date')
    let district = searchParams.get('district')
    let rooms = searchParams.get('rooms')
    const [searchURL, setSearchURL] = useState("");
    const [fetchingData, setFetchingData] = useState(false);
    const [hotelLists, setHotelLists] = useState([]);
    const [loads, setLoads] = useState([1, 2, 3, 4, 5, 6]);
    const [districts, setDistricts] = useState([]);
    const [from, setFrom] = useState("");
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(null);
    const [hotelType, setHotelType] = useState([]);
    const [hotelTypeURL, sethotelTypeURL] = useState("");
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [smallnumber, setSmallNumber] = useState(0);
    const [largenumber, setLargeNumber] = useState(0);
    const [URL, setURL] = useState("");
    const getHotelLists = async (from) => {
        let roomString = ''
        for (let i = 0; i < props.addedHotelGuestItems.length; i++) {
            let adults = props.addedHotelGuestItems[i].adults
            let childrens = props.addedHotelGuestItems[i].childrens
            roomString += 'r,' + adults.toString() + ',' + childrens.toString() + ','
        }
        if (roomString !== '') {
            roomString = roomString.slice(0, -1)
        } 
       
        let url = '?district=' + from + '&rooms=' + roomString
        // alert(check_in_date)
        setSearchURL(url)
        setFetchingData(false)
        const response = await axios(HOTEL_URL + url);
        if (response.data) {
            let numrows = response.data.results, smallest = 0, largest = 0
            if (numrows.length > 0) {
                setHotelLists(numrows)
                smallest = numrows[0].hotel_room[0].new_price
                for (var i = 0; i < numrows.length; i++) {
                    if (numrows[i].hotel_room.length > 0) {

                        if (parseFloat(numrows[i].hotel_room[0].new_price) > largest) {
                            largest = parseFloat(numrows[i].hotel_room[0].new_price);
                            setLargeNumber(largest)
                        }
                        if (parseFloat(numrows[i].hotel_room[0].new_price) <= smallest) {
                            smallest = parseFloat(numrows[i].hotel_room[0].new_price);
                            setSmallNumber(smallest)
                        }
                    }
                }
                setPriceRange([smallest, largest])
                setFetchingData(true)

            } else {
                setFetchingData(true)
            }
        } else {
            setFetchingData(true)
        }
    }
    const slidePriceRange = async (newValue) => {
        setFetchingData(false)
        let url = '?price=' + newValue[0] + '&price_2=' + newValue[1]
        setURL(url)
        let hotelURL = HOTEL_URL + url
        if (hotelTypeURL !== '') {
            hotelURL = hotelURL + '&' + hotelTypeURL
        }
        const result = await axios(hotelURL);
        if (result.data.results.length > 0) {
            setHotelLists(result.data.results);
            setFetchingData(true)

        } else {
            setHotelLists([]);
            setFetchingData(true)

        }

        // setNoOfTour(result.data.count)

    }
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
        navigate('/room-select', { state: data })
    }
    const onClickAddNewRoom = () => {
        dispatch(addNewRoom({ adults: 2, childrens: 0 }))
    }
    
    const onSearch=()=>{
            let roomString = ''
             for (let i = 0; i < props.addedHotelGuestItems.length; i++) {
                 let adults = props.addedHotelGuestItems[i].adults
                 let childrens = props.addedHotelGuestItems[i].childrens
                 roomString += 'r,' + adults.toString() + ',' + childrens.toString() + ','
             }
             if (roomString !== '') {
                 roomString = roomString.slice(0, -1)
             } 
             let storeDateInCheck=moment(journeyDate).format("YYYY/MM/DD")
             let jrdate = new Date(storeDateInCheck)
             setJourneyDate(jrdate)    
             let storeDateOutCheck=moment(returnDate).format("YYYY/MM/DD")
             let jrOdate = new Date(storeDateOutCheck)
             setReturnDate(jrOdate)
            //  alert(from.value)
            // alert('/hotel-search?district='+district+'&check_in_date='+storeDateInCheck+'&check_out_date='+storeDateOutCheck+'&rooms='+roomString)
             navigate('/hotel-search?district='+from.value+'&check_in_date='+storeDateInCheck+'&check_out_date='+storeDateOutCheck+'&rooms='+roomString)
             window.location.reload()
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
    const handleChangeFrom = (data) => {

        setFrom(data);

        localStorage.setItem('h_destination',JSON.stringify(data))
    };
    const onChangeHotelType = async (event) => {
        setFetchingData(false)
        let dataString = ""
        var listsIndex = hotelType.indexOf(event.target.value);//get  "car" index
        if (listsIndex === -1 && event.target.checked) {
            hotelType.push(event.target.value)
            dataString = hotelType.toString()
            setHotelType(hotelType)
        } else {
            const newArr = hotelType.filter(e => e !== event.target.value)
            setHotelType(newArr)
            dataString = newArr.toString()
        }

        let hotelURL = HOTEL_URL
        if (URL !== '') {
            hotelURL = hotelURL + URL +'&district='+from.value+"&hotel_types=" + dataString
        } else {
            hotelURL = hotelURL + '?district='+from.value+"&hotel_types=1,2&rooms=r,2,0"
        }
        sethotelTypeURL("hotel_types=" + dataString)
        const result = await axios(hotelURL);
        setHotelLists(result.data.results)
        setFetchingData(true)
    }
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
        let check_in_date = searchParams.get('check_in_date')
        let check_out_date = searchParams.get('check_out_date')
        let rooms = searchParams.get('rooms')   
        if (check_in_date !== undefined) {
            let jrdate = new Date(check_in_date)
            setJourneyDate(jrdate)
        }
        if (check_out_date !== undefined && check_out_date !== '' && check_out_date !== null) {
            let jrdate = new Date(check_out_date)
            setReturnDate(jrdate)
        }
        if(location.state!==null){
            localStorage.setItem('h_destination',JSON.stringify(location.state))
        }else{
            let data = localStorage.getItem('h_destination','') 
           
            if(data!==null && data!==''){
              
                let district=JSON.parse(data)
                setFrom(district)
            }else{
                navigate('/')
            }
        }
        let dateInCheck=moment().diff(check_in_date, 'days')
        let dateOutCheck=moment().diff(check_out_date, 'days')
        let storeDateInCheck=check_in_date,storeDateOutCheck=check_out_date
        if(dateInCheck>0 || isNaN(dateInCheck)){      
            storeDateInCheck=moment().format("YYYY/MM/DD")
            let jrdate = new Date(storeDateInCheck)
            setJourneyDate(jrdate)         
        }
        if(dateOutCheck>0 ||  isNaN(dateOutCheck)){
            storeDateOutCheck=moment().format("YYYY/MM/DD")
            let jrOdate = new Date(storeDateOutCheck)
            setReturnDate(jrOdate)
        }  
        if(window.performance.getEntriesByType("navigation")[0].type==='navigate'){
               let roomString = ''
                for (let i = 0; i < props.addedHotelGuestItems.length; i++) {
                    let adults = props.addedHotelGuestItems[i].adults
                    let childrens = props.addedHotelGuestItems[i].childrens
                    roomString += 'r,' + adults.toString() + ',' + childrens.toString() + ','
                }
                if (roomString !== '') {
                    roomString = roomString.slice(0, -1)
                } 
                navigate('/hotel-search?district='+district+'&check_in_date='+storeDateInCheck+'&check_out_date='+storeDateOutCheck+'&rooms='+roomString)
        }  
        if(window.performance.getEntriesByType("navigation")[0].type==='reload'){
            if(dateInCheck>0 || dateOutCheck>0 || isNaN(dateOutCheck) || isNaN(dateInCheck)){
                navigate('/hotel-search?district='+district+'&check_in_date='+storeDateInCheck+'&check_out_date='+storeDateOutCheck+'&rooms='+rooms)
                
            }
        }
        Disricts()    
        setTimeout(() => {          
            getHotelLists(district)
          
            if(location.state!==null && location.state!==''){
                setFrom(location.state)
            }

        }, 3000);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, [])
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

            <form action="" className="container mt-2">
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
                    <input type="button" value="Search" onClick={()=>onSearch()}
                        className="bg-[#fe2b5c] hover:bg-[#2e2e2e] text-slate-50 p-1 py-2 mt-2 px-14 rounded-full transition  font-medium cursor-pointer" />
                </div>
            </form >



            <div className="container flex md:flex-row flex-col gap-5 py-10 text-left">
                <div className="shadow  basis-1/4 ">
                    <img src="assets/images/googleMap.jpg" alt="" />

                    <p className="py-2 text-center w-ful">Popular filters for {from !=='' ? from.label :null}  </p>
                    <p className="border-t py-2 w-full"></p>
                    <div className="text-center">
                        <label for="" className="text-center">Price Range</label><br />
                        <Slider className="w-full" valueLabelDisplay="auto" value={priceRange} min={smallnumber} max={largenumber} aria-labelledby="range-slider" onChange={(event, newValue) => setPriceRange(newValue)} onChangeCommitted={(event, newValue) => slidePriceRange(newValue).then()} />
                        <p className="text-[10px]">BDT {priceRange[0]} - BDT {priceRange[1]}</p>
                        <p className="border-b py-2 w-full"></p>
                    </div>
                   <div className="px-5 text-gray-700">
                        <h1 className=" my-2 text-gray-700">Accommodation Type</h1>
                        <input type="checkbox" name="hotel_type" value={1} onChange={(e) => onChangeHotelType(e)} className="font-thin" name="" id="" /> <label for="">Hotel</label><br />
                        <input type="checkbox" name="hotel_type" value={2} onChange={(e) => onChangeHotelType(e)} className="font-thin" name="" id="" /><label for="" className="ml-1">Hotel
                            Resort</label>
                    </div>
                    <p className="border-b py-2 w-full"></p>

                   
                    <p className="border-b py-2 w-full"></p>
                    <div className="px-2">
                        <p className="text-center py-5">Star Rating</p>
                        <div className='flex'>
                            <Rating
                                ratingValue={0}
                                fillColor="red"
                                initialValue="1"
                                size="30"
                                tooltipStyle={'flex'}
                                tooltipClassName="display:flex"
                                fullClassName="display:flex"
                                style={{ display: 'flex' }}
                                className="flex flex-row"

                            />
                        </div>

                        {/* <input type="checkbox" name="" id="" /> <span className="text-[#ffa820]"> <i className="fa-solid fa-star"></i><i
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
                                className="fa-solid fa-star"></i></span><br /> */}
                    </div>
                </div>

                <div className=" basis-3/4 ">
                    {fetchingData ?
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
                        : null
                    }
                    {hotelLists.map((hotel, index) => (
                        <div className="flex md:flex-row flex-col my-10 gap-2 bg-[#f9f9f9]">
                            <div className="rounded-sm basis-[30%]">
                                <div className="photo-viewer-wrapper w-full">
                                    {hotel.gallery_images.length > 0 ?
                                        <div id="photo-viewer" className='relative'>
                                            <Image
                                                className="w-full"
                                                imagePath={hotel.gallery_images[0].image}
                                            />
                                            <div className="px-2 absolute bottom-2 right-1">
                                                <span className="text-[#eeb04c]"> <i className="fa-solid fa-star"></i><i
                                                    className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                                                        className="fa-solid fa-star"></i></span><br />
                                            </div>
                                        </div>
                                        : null
                                    }

                                    <div className="thumbnails grid grid-cols-3  gap-2">
                                        {hotel.gallery_images.length > 1 ?
                                            <HotelThumbnail
                                                images={hotel.gallery_images}
                                                ignore={0}
                                            /> : null
                                        }
                                    </div>


                                </div>
                            </div>
                            <div className="border-r p-1 basis-[40%]">
                                <h1 className="text-[#450303] text-lg font-medium">{hotel.hotel_name}</h1>
                                <p className="text-[#450303]">{hotel.hotel_type === 1 ? 'Hotel' : 'Resort'} </p>
                                <div className="flex text-gray-400">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <address> {hotel.address}</address>
                                </div>
                                {hotel.near_by_area !== '' ?
                                    <p className='text-blue-400'><i class="fa-solid fa-umbrella-beach text-sm"></i>{hotel.near_by_area}</p>
                                    : null
                                }
                                <ul className="mt-5 flex gap-1 text-sm">
                                    {hotel.facilities !== '' && hotel.facilities.slice(0, 3).map((facility, index) => (
                                        <li className="shadow border bg-gray-50 px-2" key={index}><a href="" className="">{facility.text}</a>
                                        </li>
                                    ))}
                                    {hotel.facilities.length > 4 ?
                                        <li className="shadow border bg-gray-50 px-2">+{hotel.facilities.length - 4}</li>
                                        : null
                                    }
                                </ul>
                            </div>
                            <div className="text-center p-2 basis-[30%] mt-3 md:mt-0">
                                <div className=" flex justify-between px-10 md:mb-0 mb-5">
                                    <h4 className="text-[#450303]">{RatingText(hotel.ratings)}</h4>
                                    <div className="relative">
                                        <img src="assets/images/resort/Union.png" className=" w-6" alt="" />
                                        <p className="absolute top-1 text-sm ">{hotel.ratings}</p>
                                    </div>
                                </div>
                                <p className="text-[12px] text-gray-400">{hotel.hotel_reviews.length < 2 ? hotel.hotel_reviews.length + ' ' + 'review' : hotel.hotel_reviews.length.toLocaleString() + ' ' + 'reviews'}</p>
                                <h1 className="text-lg text-[#450303] font-medium">BDT {hotel.hotel_room.length > 0 ? hotel.hotel_room[0].new_price.toLocaleString() : null}</h1>
                                <p className="text-[12px] text-gray-400">For 1 room per night</p>
                                <p className="text-sm py-5">Additional discount for selected
                                    payment methods*</p>
                                <div
                                    className="flex bg-[#26aed6] items-center gap-1 text-white mx-5 justify-center md:w-28 text-sm py-1 text-center  rounded-md ml-12">
                                    <button onClick={() => onClickSelectRoom(hotel)} >Select room</button><i className="fa-solid fa-angle-right"></i>

                                </div>
                            </div>
                        </div>
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


        </div >


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
)(Hotel);

