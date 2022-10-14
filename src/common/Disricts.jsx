import axios from "axios";
import {DISTRICT_URL} from '../constants/api'
const Disricts = async () => {
    
  
    const result = await axios.get(DISTRICT_URL);
    var data=[]
    if (result.data.length>0){
        for (var i=0;i<result.data.length;i++){
            data.push({'value':result.data[i].id,'label':result.data[i].name})
        }
        
    }
    // alert(JSON.stringify(data))
      return data
   
}
export default Disricts
   
