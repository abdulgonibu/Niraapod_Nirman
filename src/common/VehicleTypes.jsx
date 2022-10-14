import React,{useState,useEffect} from 'react';
import axios from "axios";
import {VEHICLE_TYPE_URL} from '../constants/api'
const VehicleTypes = () => {
    const [vehicletypes, setVehicleTypes] = useState([]);
    
    const getVehicleTypes = async () => {
        const result = await axios.get(VEHICLE_TYPE_URL);
     
        if (result.data.length>0){
            setVehicleTypes(result.data);

        }
      }
    
      useEffect(() => {
        getVehicleTypes()
      }, [])
    


    return (
        // alert(JSgetDistricts)
        <>
        {vehicletypes.length>0 && vehicletypes.map((vehicle,index)=>(
            <option value={vehicle.id} key={index} >{vehicle.name}</option>
        ))}
        </>
    )
}
export default VehicleTypes;
