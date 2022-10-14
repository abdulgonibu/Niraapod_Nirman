const HotelPopUp = (props) => {

    // alert(JSON.stringify(props.list))
    return (



        <div className="absolute md:-left-16 -left-44 top-full w-[350px]  bg-white rounded shadow-md py-3 px-3" >
            {props.list.map((hotelGhuets, index) => (
                <>
                    <div className="relative">
                        <li className="py-3 flex items-center  justify-between  transition cursor-pointer group  border-b border-gray-400" onClick={() => props.onclickRoomExpand(index)}>
                            <div className="grid gap-1">
                                <div className="flex justify-between">
                                    <span className=" text-gray-600 font-semibold ">Room {index + 1}</span>
                                    <div className="ml-60">
                                    {hotelGhuets.isExpand ?
                                         <i class="fa-solid fa-chevron-down text-sm"></i>
                                         :
                                        <i class="fa-solid fa-chevron-up text-sm"></i>
                                    }  
                                    </div>
                                </div>


                                <span className=" text-gray-600  text-sm">{hotelGhuets.adults} Adult{hotelGhuets.adults > 1 ? 's' : ''}</span>
                            </div>


                        </li>
                        {index !== 0 ? <p className="text-xs text-gray-600 absolute right-20 top-8" onClick={() => props.onClickRemoveRoom(hotelGhuets)}>Remove</p> : null}

                    </div>

                    {hotelGhuets.isExpand ?
                        <>
                            <li className="py-3 flex items-center  justify-between  transition cursor-pointer group relative border-b border-gray-400">
                                <div className="grid">
                                    <span className=" text-gray-600  ">Adult{hotelGhuets.adults > 1 ? 's' : ''}</span>
                                    <span className=" text-gray-600  text-sm">12 Year + </span>
                                </div>
                                <div className="flex gap-2 text-[#54d1bb]">
                                    <i className="fa-solid fa-circle-minus text-lg" onClick={hotelGhuets.adults > 1 ? () => props.onClickSubtractAdults(hotelGhuets, index) : null}></i>
                                    <p className="text-gray-600 mt-1">{hotelGhuets.adults}</p>
                                    <i className="fa-solid fa-circle-plus text-lg" onClick={hotelGhuets.adults < 30 ? () => props.onClickAddAdults(hotelGhuets, index) : null}  ></i>
                                </div>
                            </li>
                            <li className="py-3 flex items-center  justify-between  transition cursor-pointer group relative">
                                <div className="grid">
                                    <span className=" text-gray-500  font-roboto">Child</span>
                                    <span className=" text-gray-500  text-sm">0-12 Year </span>
                                </div>
                                <div className="flex gap-2  text-[#54d1bb] " >
                                    <i className="fa-solid fa-circle-minus text-lg" onClick={hotelGhuets.childrens > 0 ? () => props.onClickSubtractChildrens(hotelGhuets, index) : null}></i>
                                    <p className=" text-gray-600 mt-1">{hotelGhuets.childrens}</p>
                                    <i className="fa-solid fa-circle-plus text-lg" onClick={hotelGhuets.childrens < 10 ? () => props.onClickAddChildrens(hotelGhuets, index) : null}></i>
                                </div>
                            </li>

                            <li className="py-3 flex items-center  justify-between  transition cursor-pointer group relative border-b border-gray-400">
                                <div className="grid grid-cols-4 w-full gap-2">
                                    {hotelGhuets.childrens > 0 && hotelGhuets.childs.map((child, childindex) => (

                                        <div className="grid gap-1">
                                            <label htmlFor="" className="text-xs">Child {childindex + 1} age</label>
                                            <select name="childvalue" className="border focus:outline-none gap-1 py-1 rounded text-center" onChange={(event) => props.onClickChildSelection(event, index, childindex)}>
                                                <option value="1" selected={child.childAge === 1 ? true : false}>1</option>
                                                <option value="2" selected={child.childAge === 2 ? true : false}>2</option>
                                                <option value="3" selected={child.childAge === 3 ? true : false}>3</option>
                                                <option value="5" selected={child.childAge === 4 ? true : false}>4</option>
                                                <option value="5" selected={child.childAge === 5 ? true : false}>5</option>
                                                <option value="6" selected={child.childAge === 6 ? true : false}>6</option>
                                                <option value="7" selected={child.childAge === 7 ? true : false}>7</option>
                                                <option value="8" selected={child.childAge === 8 ? true : false}>8</option>
                                                <option value="9" selected={child.childAge === 9 ? true : false}>9</option>
                                                <option value="10" selected={child.childAge === 10 ? true : false}>10</option>
                                                <option value="11" selected={child.childAge === 11 ? true : false}>11</option>
                                                <option value="12" selected={child.childAge === 12 ? true : false}> 12</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        </> : null
                    }
                </>
            ))}
            <div className="py-2">
                <p className="text-xs text-red-500">More than 3 guests ?</p>
                <p className="text-xs text-red-500">Add another room to get more option</p>
            </div>

            <li className="py-3 flex items-center  justify-center  transition cursor-pointer">
                <div className="flex  gap-2 border bg-[#2e2e2e] text-white border-gray-400 px-2 py-1 rounded">
                    <i className="fa-solid fa-circle-plus text-lg gap-3 text-[#54d1bb] "></i>
                    <button type="button" className="text-xs cursor-pointer" onClick={() => props.onClickAddNewRoom()} disabled={props.list.length > 2 ? true : false} >Add Another Room</button>
                </div>
            </li>
        </div>
    );
}




export default HotelPopUp

