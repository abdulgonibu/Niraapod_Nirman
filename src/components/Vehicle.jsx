import React, { useEffect,useState } from "react";
import axios from "axios";
import {  Link,useSearchParams } from "react-router-dom";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";
import moment from 'moment';
import {BASE_URL,DISTRICT_URL,VEHICLE_FARE_URL,AVAILABLE_DRIVER_URL,SOCKET_IO_URL,SEND_DRIVER_REQUEST_URL,TRIP_URL} from '../constants/api'
import {isValidURL} from '../constants/customMethod'
import {Slider} from "@material-ui/core";
import ContentLoader from 'react-content-loader'
import { useNavigate } from "react-router-dom";
import {SECRET_APP,SECRET_PASSWORD,REQUEST_INTERVAL} from '../constants/config'
import SocketIO from 'socket.io-client';
const Vehicle = ()=>{
    let [searchParams, setSearchParams] = useSearchParams();
    let check_in_date = searchParams.get('check_in_date')
    let check_out_date = searchParams.get('check_out_date')
    let from = searchParams.get('from')
    let to = searchParams.get('to')
    let trip = searchParams.get('trip')
    let vehicle = searchParams.get('vehicle')
    const [fromName, setFromName] = useState("");
    const [toName, setToName] = useState("");
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [smallnumber, setSmallNumber] = useState(0);
    const [largenumber, setLargeNumber] = useState(0);
    const [ratings, setRatings] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);
    const [vehicleClasses, setVehicleClaseses] = useState([]);
    const [vehicleLists, setvehicleLists] = useState([]);
    const [confirming, setConfirming] = useState(false);
    const [searchURL, setSearchURL] = useState(""); 
    const [intervalID, setIntervalID] = useState(''); 

    const navigate = useNavigate();
    var interval = null;    
    const socketUserConnect = async()=> {
        const token =   localStorage.getItem("token", "");
        let user    =   localStorage.getItem('currentUser','');
        var socket = SocketIO.connect(SOCKET_IO_URL);
        socket.on("connect", () => {
         
            if(user){
                user=JSON.parse(user)
                socket.emit("userIdReceived", (user.id));
            }
            socket.on("userRequestAccept", driverRouteRespone => {
                clearInterval(intervalID)
                setIntervalID('')
                navigate("/vehicle-confirm",{state:{'tripId':driverRouteRespone.id}});
                // navigate("/signup",{state:{'phoneNo':formValues.phone_no}});
                //navigate("/vehicle-confirm");
                setConfirming(false)
            })
        })
        
       
    }    
    const slidePriceRange = async (newValue) => {
        // const params = new URLSearchParams(props.slug);
        // setPriceRange(newValue)
        // let url ='?vehicle_class__vehicle_type__id='+vehicle+'&district_from='+from+'&district_to='+to
        // setFetchingData(true)
        // const result = await axios(VEHICLE_FARE_URL + '&secondary_categories__slug='+url);
        // setVehicles([]);
        // setVehicles(result.data.results);
        // setFetchingData(false)
        
      }
    const getVehicesClassWithPrice = async () => {
        let url ='?vehicle_class__vehicle_type__id='+vehicle+'&district_from='+from+'&district_to='+to
        setSearchURL(url)
        setFetchingData(false)
        const response = await axios(VEHICLE_FARE_URL +url);
        if(response.data){  
            if(response.data.results.length>0){
              let numrows=response.data.results
              setVehicles(numrows)
              setVehicleClaseses(numrows)
              let smallest=0,largest=0,minrat=0,maxRat=0
              smallest=parseFloat(numrows[0].total_fare)
              for (var i = 0; i < numrows.length; i++) {              
                if (parseFloat(numrows[i].total_fare) > largest) {
                    largest = parseFloat(numrows[i].total_fare);
                    setLargeNumber(largest)
                }               
                if (parseFloat(numrows[i].total_fare) < smallest) {  
                    smallest = parseFloat(numrows[i].total_fare);
                     setSmallNumber(smallest)
                }
                if (parseFloat(numrows[i].vehicle_class.vehicle_ratings) <= maxRat) {               
                    maxRat = parseFloat(numrows[i].vehicle_class.vehicle_ratings);
                }
                if (parseFloat(numrows[i].vehicle_class.vehicle_ratings)  < minrat) {               
                    minrat = minrat
                }       
              }
                //  if(trip==='2'){
                //     largest=largest*2
                //    // smallest=smallest*2
                //  }
                // setLargeNumber(largest)
                // setSmallNumber(4200)
                // setminRatings(minrat)
                // setMaxRatings(maxRat)
                // let ratings=[]
                // alert("Min "+minrat)
                // for (let i=10;i<=maxRat;i++){
                //        ratings.push(i) 
                // }
                // setRatings(ratings)
                // setPriceRange([smallest, largest])
                setPriceRange([smallest,largest])
           }
         
          setFetchingData(true)
        }       
    }
    const Disricts = async (from) => {
        const result = await axios.get(DISTRICT_URL+from+'/');
        if (result.data !==''){
            setFromName(result.data.name)
        }
    }
    const DisrictTo = async (to) => {
        const result = await axios.get(DISTRICT_URL+to+'/');
       
        if (result.data !==''){
            setToName(result.data.name)
        }
    }
    const onChangeVehicleClass= async(event)=>{
        setFetchingData(false)
        let dataString=""
        var listsIndex = vehicleLists.indexOf(event.target.value);//get  "car" index
        if(listsIndex===-1 && event.target.checked){
            vehicleLists.push(event.target.value)
            dataString=vehicleLists.toString()
            setvehicleLists(vehicleLists)
        }else{
            const newArr = vehicleLists.filter(e => e !== event.target.value)    
            setvehicleLists(newArr)
            dataString=newArr.toString()
        }
        let search_URL=searchURL+'&vehicle_classes='+dataString.toString()
        const response = await axios(VEHICLE_FARE_URL+search_URL);
        if(response.data){  
            if(response.data.results.length>0){
            let numrows=response.data.results
            setVehicles(numrows)
        }
        setFetchingData(true)
        }   
    }


    const confirmBoking = async(bookingData)=>{
        const token=localStorage.getItem('token','');
      
        if(token && bookingData.vehicle_class.id !== ''){
            let user=localStorage.getItem('currentUser','');
         
            let vehicle=bookingData.vehicle_class.id
            let phone_no='',full_name='',last_name='',user_id=''
            setConfirming(true)
            if(user!==''){
                user=JSON.parse(user)
                user_id=user.id
                if(user.last_name !==null && user.last_name !==''){
                    last_name=' '+user.last_name
                }
                phone_no=user.phone_no
                full_name=user.first_name+last_name
                bookingData['phone_no']=phone_no
                bookingData['user_id']=user_id
            }
           
            let availableURL=AVAILABLE_DRIVER_URL+"?district_id="+from+"&check_in_date="+check_in_date+"&vehicle_class="+vehicle
            const response = await axios(availableURL, {headers: {
                'Authorization': `Token ${token}`
              }});
            let drivers=[]   
            if(response.data){
                for(let i=0;i<response.data.length;i++){
                    let data={
                    'user_id':user_id.toString(),
                    'driver_request':"true",
                    'full_name':full_name, 
                    'driver_id':response.data[i].id.toString(),
                    'district_from':from.toString(),
                    'district_to':to.toString(),
                    'Super':'Niraapod',
                    'vehicle_class':response.data[i].vehicle_class?response.data[i].vehicle_class.toString():'',
                    'trip_hotel':'1',
                    'SECRET_KEY':SECRET_PASSWORD,
                    'SECRET_APP':SECRET_APP,
                    'check_in_date':moment(check_in_date.toString()).format('DD-MM-YYYY'),
                    'type':'web',
                    'phone_no':phone_no,
                    'trip_type':trip.toString(),
                    'discount_amount':"0",
                    'total_fare':trip === '2' ? (parseFloat(bookingData.total_fare)*2).toString():(bookingData.total_fare).toString()

                    } 
                    if(check_out_date!==''){
                        data['check_out_date']=moment(check_out_date.toString()).format('DD-MM-YYYY') 
                    }
                    drivers.push(data)
                }
               
            //     // alert(JSON.stringify(response.data.user))
             }  
            setTimeout(async() => {
                setConfirming(true)
                ConnectingDriver(drivers,bookingData)
              
            }, 3000);
        }
       
    }
    const requestPostNotFoundDriver =async (data)=>{
      const token=localStorage.getItem('token',''); 
      const response = await axios.post(TRIP_URL, data,{headers: {
                     'Authorization': `Token ${token}`
                 }});    
        if(response.data){
            navigate("/vehicle-confirm",{state:{'tripId':response.data.id}});
        }
    }




    const ConnectingDriver = (driversList,bookingData)=>{
        var list=driversList
        var i = 0, remove = 0, confirmProcess = 0, found = true,checking=0;
        var userInfo = driversList
            var requestdata={
            'user_id':bookingData.user_id.toString(),
            'driver_request':"true",
            // 'full_name':full_name, 
            // 'driver_id':response.data[i].id.toString(),
            'district_from':from.toString(),
            'district_to':to.toString(),
            'Super':'Niraapod',
            'vehicle':vehicle,
            'trip_hotel':'1',
            'SECRET_KEY':SECRET_PASSWORD,
            'SECRET_APP':SECRET_APP,
            'check_in_date':moment(check_in_date.toString()).format('DD-MM-YYYY'),
            'type':'web',
            'phone_no':bookingData.phone_no,
            'trip_type':trip.toString(),
            'discount_amount':"0",
            'total_fare':trip === '2' ? (parseFloat(bookingData.total_fare)*2).toString():(bookingData.total_fare).toString()

            } 
            if(check_in_date!==''){
                requestdata['check_out_date']=moment(check_out_date.toString()).format('DD-MM-YYYY')
            }
      if(driversList.length>0){ 
         interval = setInterval(async() => {
            if (i === 0) {
                console.log("First", list[0])
                const token=localStorage.getItem('token','');
                const response = await axios.post(SEND_DRIVER_REQUEST_URL, list[0],{headers: {
                    'Authorization': `Token ${token}`
                }});         
            }
            i++;
            console.log("sec",i)
            if (i === REQUEST_INTERVAL) {
              i = 0;
              var data = userInfo.splice('id', 1);
              var result = userInfo.filter(function (n) { return !this.has(n) }, new Set(data));
              if (result.length === 0) {
                
               requestPostNotFoundDriver(requestdata)
                found = false
                setConfirming(false)
                confirmProcess++
                clearInterval(interval);
  
              }
              remove++;
            }
          },
            1000);
        } else {
         setConfirming(false)
         requestPostNotFoundDriver(requestdata)
        //  alert(JSON.stringify(requestdata))
        }
        setIntervalID(interval)
    } 


    useEffect(() => {
      
        Disricts(from)
        DisrictTo(to)
      
        setTimeout(() => {
            getVehicesClassWithPrice()
        }, 3000);
      
        socketUserConnect()
       
// alert(intervalID)
      
      }, [intervalID])
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

                <div class="container py-16">
                    <div class="grid md:grid-cols-2 gap-5">
                     {check_in_date!=='' ?
                        <div class="flex text-left gap-10 md:gap-5 md:border-r">
                            <img src="assets/images/vehicle/2.png" class="h-24" alt="" />
                            <div class="">
                                <h6 class="text-xs py-1">
                                    Departure
                                </h6>
                                <h4>{fromName} - {toName}</h4>
                                <p>{moment(check_in_date).format('DD MMMM YYYY')}</p>
                            </div>
                        </div>
                        :null
                        }
                        {check_out_date !== '' && trip === '2' ?
                        <div class="flex text-left gap-10 md:gap-5">
                            <img src="assets/images/vehicle/1.png" class="h-24" alt="" />
                            <div class="flex flex-col md:justify-between ">
                                <div class="text-left">
                                    <h6 class="text-xs py-1">
                                        Return
                                    </h6>
                                    <h4>{toName} - {fromName}</h4>
                                    <p>{moment(check_out_date).format('DD MMMM YYYY')}</p>
                                </div>
                                <div class="md:ml-44 mt-5 text-center">
                                    <p class="bg-[#15db05] rounded p-2 text-sm text-white">Modify Search</p>
                                </div>
                            </div>
                        </div>
                        :null
                        }
                    </div>
                    <div></div>


                </div>
                {/* <div class="container w-full text-center hidden md:block">
                    <table class="table-auto  border w-full">
                        <thead class="bg-gray-800 text-gray-100 text-sm">
                            <tr>
                                <th>Departing
                                    Time</th>
                                <th>Vehicle no</th>
                                <th>Starting point</th>
                                <th>Ending point</th>
                                <th>Route</th>
                                <th>Seats Available</th>
                                <th>Vehicle Type</th>
                                <th>AC/Non AC</th>
                                <th>Fare/person</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                            <tr>
                                <td>8.00 am </td>
                                <td>C1025</td>
                                <td>Arambag</td>
                                <td>CTG-BRTC-2 </td>
                                <td>Dhaka - Chattogram</td>
                                <td>06</td>
                                <td>Noah Micro Bus</td>
                                <td>Non AC</td>
                                <td> ৳ 2900</td>
                            </tr>
                            <tr>
                                <td>8.00 am </td>
                                <td>C1025</td>
                                <td>Arambag</td>
                                <td>CTG-BRTC-2 </td>
                                <td>Dhaka - Chattogram</td>
                                <td>06</td>
                                <td>Noah Micro Bus</td>
                                <td>Non AC</td>
                                <td> ৳ 2900</td>
                            </tr>
                            <tr>
                                <td>8.00 am </td>
                                <td>C1025</td>
                                <td>Arambag</td>
                                <td>CTG-BRTC-2 </td>
                                <td>Dhaka - Chattogram</td>
                                <td>06</td>
                                <td>Noah Micro Bus</td>
                                <td>Non AC</td>
                                <td> ৳ 2900</td>
                            </tr>
                            <tr>
                                <td>8.00 am </td>
                                <td>C1025</td>
                                <td>Arambag</td>
                                <td>CTG-BRTC-2 </td>
                                <td>Dhaka - Chattogram</td>
                                <td>06</td>
                                <td>Noah Micro Bus</td>
                                <td>Non AC</td>
                                <td> ৳ 2900</td>
                            </tr>
                            <tr>
                                <td>8.00 am </td>
                                <td>C1025</td>
                                <td>Arambag</td>
                                <td>CTG-BRTC-2 </td>
                                <td>Dhaka - Chattogram</td>
                                <td>06</td>
                                <td>Noah Micro Bus</td>
                                <td>Non AC</td>
                                <td> ৳ 2900</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

                <div className="container flex md:flex-row flex-col gap-5 py-10 pb-10">
                    <div className="shadow basis-1/4  pb-5">
                        <img src="assets/images/googleMap.jpg" alt="" />
                        <p className="py-2 text-center w-ful">Popular filters for {toName} </p>
                        <p className="border-t py-2 w-full"></p>
                        <div className="text-center">
                      
                            <label for="" className="text-center">Price Range</label>
                            <Slider  className="w-full"  valueLabelDisplay="auto" value={priceRange} min={smallnumber} max={largenumber} aria-labelledby="range-slider" onChange={(event, newValue) => setPriceRange(newValue)} onChangeCommitted={(event, newValue) => slidePriceRange(newValue).then()}/>

                            <p className="text-[10px]">BDT {priceRange[0]} - BDT {priceRange[1]}</p>
                            <p className="border-b py-2 w-full"></p>

                        </div>

                        <p className="border-b py-2 w-full"></p>

                        <div className="px-5 text-gray-700 font-normal text-left">
                            <h1 className=" my-2 text-gray-700 text-center font-semibold border-b-2 border-gray-400">Vehicle Class</h1>
                            <div className="grid text-gray-500 text-sm">
                            {vehicleClasses.map((vehicleClass,index)=>(
                                <div className="flex " key={index}>
                                    <input type="checkbox" value={vehicleClass.vehicle_class?vehicleClass.vehicle_class.id:null} name="vehicle_class" onChange={(e)=>onChangeVehicleClass(e)} className="font-thin mr-2 mt-1"  id="" /> <label for="">{vehicleClass.vehicle_class?vehicleClass.vehicle_class.name:null}</label>

                                </div>
                            ))}
                              


                            </div>


                        </div>
                        <div className="px-5 py-5 text-gray-700 font-normal text-left">
                            <h1 className=" my-2 text-gray-700 text-center font-semibold border-b-2 border-gray-400">Rating</h1>
                            <div className="grid text-gray-500 text-sm">
                            {ratings.map((rating,index)=>(
                                <div className="flex ">
                                    <input type="checkbox" className="font-thin mr-2 mt-1" name="" id="" /> <label for="">{rating}</label>

                                </div>
                            ))}
                               


                            </div>


                        </div>

                    </div>
                    
                    <div className="basis-3/4 md:mt-0 mt-5">
                   
                        <div className="grid md:grid-cols-3  gap-2 md:border-2 mb-5 border-gray-300 py-3  rounded-sm px-2 text-center bg-gray-100">
                            <div className="md:border-r-2 border md:p-0 p-2 md:border-0 border-gray-300">

                                <p>Recommeneded</p>
                            </div>
                            <div className="md:border-r-2 border p-2 md:p-0 md:border-0 border-gray-300">
                                <p>Cheapest</p>
                            </div>
                            <div className="md:border-r-2 border p-2 md:p-0 md:border-0 border-gray-300">
                                <p>Best Rated</p>
                            </div>
                        </div>
                      
                        {confirming ? 
                        <div className="items-center py-12 pl-8">
                        <img src={require("../assets/confirmLoader.gif")} alt="wait until the page loads"  width="282px" height="268px"/>
                        </div>
                        :
                        <>
                            {fetchingData && vehicles.map((vehicle,index)=>(
                            <div className="grid md:grid-cols-2 bg-gray-100 mb-5" key={index}>
                                <div className="md:border-r border-gray-400 grid md:grid-cols-2 ">
                                    <div className='relative'>
                                        <img src={vehicle.vehicle_class?isValidURL(vehicle.vehicle_class.vehicle_class_photo):null} className=" w-full h-full p-2" alt="" />
                                        <p className='bg-orange-500 absolute bottom-1 left-2 rounded text-white px-1'>{vehicle.vehicle_class?vehicle.vehicle_class.vehicle_ratings:0}</p>
                                    </div>
                                    <div className="p-3">
                                        <h1 className="text-left text-gray-700 font-semibold">{vehicle.vehicle_class?vehicle.vehicle_class.name:null}</h1>
                                        {/* <p className='font-thin text-left text-sm'>or similar</p> */}
                                        <div className='grid grid-cols-3'>
                                            <div className="flex gap-1 mt-2 text-gray-600">
                                                <i class="fa-solid fa-user text-sm"></i>
                                                <p>{vehicle.vehicle_class?vehicle.vehicle_class.seat_capacity:null}</p>
                                            </div>
                                    
                                            <div className="flex gap-1 mt-2 text-gray-600">
                                                <i class="fa-solid fa-bag-shopping text-sm"></i>
                                                <p>{vehicle.vehicle_class?vehicle.vehicle_class.number_of_bags:'0'}</p>
                                            </div>
                                        
                                        
                                            <div className="flex gap-1 mt-2 text-gray-600">
                                                <i class="fa-solid fa-door-closed text-sm"></i>
                                                <p>{vehicle.vehicle_class ? vehicle.vehicle_class.number_of_doors:'0'}</p>
                                            </div>
                                        

                                        </div>
                                        <h1 className='font-semibold pt-2 text-left'>Pick up & Drop off</h1>
                                        <p className='text-xs text-left'>{fromName + ' - '+ toName}</p>
                                        <div className='grid grid-cols-2 text-left mt-2'>
                                            <div>
                                                <h1 className='font-semibold'>Trip</h1>
                                                <p className='text-sm'>{trip==='1' ? 'One Way': 'Return'}</p>
                                            </div>
                                            {/* <div>
                                                <h1 className='font-semibold'>Milage</h1>
                                                <p className='text-sm'>Unlimited</p>
                                            </div> */}
                                        </div> 
                                        <div className="text-left p-1 items-start gap-1 bg-gray-50 w-20 shadow rounded justify-start flex mt-5">
                                            <i class="fa-solid fa-share text-xs "></i>
                                            <p className="  text-xs ">Day Tour</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="md:mt-24  md:px-2 px-4">
                                    <p className="text-left text-gray-700"> Total</p>
                                    <p className="text-lg text-left font-bold text-gray-700"> BDT {trip >1 ? parseFloat(vehicle.total_fare*2):vehicle.total_fare}</p>
                                    <button className='bg-orange-500 px-8 py-2 text-right text-gray-50 rounded' onClick={()=>confirmBoking(vehicle)}> Confirm
                                    </button>
                                </div>

                            </div>
                            ))}
                            {!fetchingData ?
                            <ContentLoader viewBox="0 0 380 70">
                            {/* Only SVG shapes */}    
                            <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                            <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                            <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                        </ContentLoader>
                        :null
                        }   
                        </>
                       }

                    </div>
                </div>
            </div >
        );
    
}

export default Vehicle;