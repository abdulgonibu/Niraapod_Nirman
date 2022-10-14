
import {

    ADD_NEW_ROOM,INCREMANT_ADULTS, INCREMANT_CHILDS, REMOVE_ROOM, DECREMENT_CHILDS, DECREMENT_ADULTS,ONCHANGE_CHILD_VALUE,ONEXPAND_ROOM

} from '../actionstypes/hotelGuestActionTypes'
    

//add cart action
export const addNewRoom= (data)=>{
    return{
        type: ADD_NEW_ROOM,
        payload:{
            data
        }
    }
}

export const removeRoom= (data)=>{
     return{
         type: REMOVE_ROOM,
         payload:{
             data
         }
     }
 }
 



 export const increamantAdult= (data)=>{
    // alert(JSON.stringify(data))
     return{
         type: INCREMANT_ADULTS,
         payload:{
             data
         }
     }
 }
 export const decremantAdults= (data)=>{
     return{
         type: DECREMENT_ADULTS,
         payload:{
             data
         }
     }
 }
 export const increamentChilds= (data)=>{
    // alert(JSON.stringify(data))
     return{
         type: INCREMANT_CHILDS,
         payload:{
             data
         }
     }
 }
 export const decrementChilds= (data)=>{
    // alert(JSON.stringify(data))
     return{
         type: DECREMENT_CHILDS,
         payload:{
             data
         }
     }
 }
 
 export const onchangeChildsValue= (data)=>{
  
     return{
         type: ONCHANGE_CHILD_VALUE,
         payload:{
             data
         }
     }
 }
 
  
 export const onExpandRoom= (data)=>{
  
    return{
        type: ONEXPAND_ROOM,
        payload:{
            data
        }
    }
}
 