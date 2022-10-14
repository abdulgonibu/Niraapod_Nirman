import {

    ADD_NEW_ROOM,INCREMANT_ADULTS, INCREMANT_CHILDS, REMOVE_ROOM, DECREMENT_CHILDS, DECREMENT_ADULTS,ONCHANGE_CHILD_VALUE,ONEXPAND_ROOM

} from '../actionstypes/hotelGuestActionTypes'


const indexwiseExpandList=(arrOfObj=[],changeIndex='')=>{
    for (let i=0;i<arrOfObj.length;i++){
        if(changeIndex!=='' && changeIndex===i){
            arrOfObj[i].isExpand=true
        }else{
            arrOfObj[i].isExpand = false;
        }
    }
     return arrOfObj

}



const getCounntTotalGuestChildAdults=(data)=>{
    let totalAdults=0,totalChldrens=0
  
    for(var i=0;i<data.length;i++){
        totalAdults +=parseInt(data[i].adults)
        totalChldrens +=parseInt(data[i].childrens)
    }
    return {
        totalAdults:totalAdults,
        totalChldrens:totalChldrens,
        totalGuests:totalAdults+totalChldrens
    }

}



const initState = {
    // items:[],
    addedHotelGuestItems: [
        {id:Math.random().toString(16),adults:2,childrens:0,childs:[],isExpand:true}
    ],
    totalGuests: 2,
    totalChldrens:0,
    totalAdults: 2,
    totalRooms:1,
    

}
const hotelGuestReducer = (state = initState, action) => {
    if (action.type === ADD_NEW_ROOM) {
        action.payload.data['key']=Math.random().toString(16)
        let newArr1 = indexwiseExpandList([...state.addedHotelGuestItems])

        action.payload.data['isExpand']=true
        let data= [...newArr1,action.payload.data]
        let dataummary=getCounntTotalGuestChildAdults(data)
        return {
           
            ...state,
            addedHotelGuestItems:data,
            totalRooms:data.length,
            totalGuests: dataummary.totalGuests,
            totalChldrens:dataummary.totalChldrens,
            totalAdults: dataummary.totalAdults,
        }

    }if(action.type===REMOVE_ROOM){
        let new_items = [...state.addedHotelGuestItems].filter(item => action.payload.data.key !== item.key)
        let newItems=indexwiseExpandList(new_items,new_items.length-1)
        let dataummary=getCounntTotalGuestChildAdults(newItems)
        return {
            ...state,
            addedHotelGuestItems:[...new_items],
            totalRooms:new_items.length,
            totalGuests: dataummary.totalGuests,
            totalChldrens:dataummary.totalChldrens,
            totalAdults: dataummary.totalAdults,
            

        }
    }if (action.type === INCREMANT_ADULTS) {
        let addedItem = state.addedHotelGuestItems.find(item => item.key === action.payload.data.key)
        addedItem.adults += 1
        let updatedAdults=[...state.addedHotelGuestItems]
        updatedAdults[action.payload.data.id]=addedItem
        let dataummary=getCounntTotalGuestChildAdults(updatedAdults)
        return {
            ...state,
            addedHotelGuestItems:updatedAdults,
            totalGuests: dataummary.totalGuests,
            totalChldrens:dataummary.totalChldrens,
            totalAdults: dataummary.totalAdults,
            totalRooms:updatedAdults.length,
        }

    } if (action.type === DECREMENT_ADULTS) {
        let addedItem = state.addedHotelGuestItems.find(item => item.key === action.payload.data.key)
        let updatedAdults=[...state.addedHotelGuestItems]
        if(addedItem.adults>1){
        addedItem.adults -= 1
        updatedAdults[action.payload.data.id]=addedItem
        }
        let dataummary=getCounntTotalGuestChildAdults(updatedAdults)
        return {
            ...state,
            addedHotelGuestItems:updatedAdults,
            totalGuests: dataummary.totalGuests,
            totalChldrens:dataummary.totalChldrens,
            totalAdults: dataummary.totalAdults,
            totalRooms:updatedAdults.length,
        }
       

    }
    if (action.type === INCREMANT_CHILDS) {
 
      
        let updatedChilds=[...state.addedHotelGuestItems]
        let data=updatedChilds.find(item => item.key === action.payload.data.key)
        data.childrens=data.childrens+1
        
        if(!data.hasOwnProperty('childs')){
            data["childs"]=[]
            data.childs=[...data.childs,{children:"childrenAge",childAge:2}]
        }else{
            data.childs=[...data.childs,{children:"childrenAge",childAge:2}]
        }
        updatedChilds[action.payload.data.id]=data
        let dataummary=getCounntTotalGuestChildAdults(updatedChilds)
        return {
            ...state,
            addedHotelGuestItems:updatedChilds,
            totalGuests: dataummary.totalGuests,
            totalChldrens:dataummary.totalChldrens,
            totalAdults: dataummary.totalAdults,
            totalRooms:updatedChilds.length,
        }
        

    } 
    if (action.type === DECREMENT_CHILDS) {
        let addedItem = state.addedHotelGuestItems.find(item => item.key === action.payload.data.key)
        let updatedChilds=[...state.addedHotelGuestItems]
        if(addedItem.childrens>0){
            addedItem.childrens -= 1
        if(addedItem.childs.length>0 &&  addedItem.childrens!==0){
            addedItem.childs=addedItem.childs.slice(0, -1); 
        }else{
            addedItem.childs=[]
        }
        updatedChilds[action.payload.data.id]=addedItem        
        }
        let dataummary=getCounntTotalGuestChildAdults(updatedChilds)
        return {
            ...state,
            addedHotelGuestItems:updatedChilds,
            totalGuests: dataummary.totalGuests,
            totalChldrens:dataummary.totalChldrens,
            totalAdults: dataummary.totalAdults,
            totalRooms:updatedChilds.length,
        }
    }
    if (action.type === ONCHANGE_CHILD_VALUE) {
        let updatedChilds=[...state.addedHotelGuestItems]
        let roomData=updatedChilds[action.payload.data.id]

        if (roomData !==''){
           let childList=roomData.childs[action.payload.data.child]
           childList.childAge=parseInt(action.payload.data.selectedValue)
           roomData.childs[action.payload.data.child]=childList
           updatedChilds[action.payload.data.id]=roomData
            return {
                ...state,
                addedHotelGuestItems:updatedChilds,
            }
        }else{
            return {
                ...state
            }
        }
    }
    if (action.type === ONEXPAND_ROOM) {
        let updatedChilds=indexwiseExpandList([...state.addedHotelGuestItems],action.payload.data.index)
            return {
                ...state,
                addedHotelGuestItems:updatedChilds,
            }
     
    }
    
    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            totalGuests: state.totalGuests - 6
        }
    }

    else {
        return state
    }

}

export default hotelGuestReducer