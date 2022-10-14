import Image from '../common/Image'

const vehicleFareList = (data = {}, index = 0) => {

    return (

        <div className="course-item group relative" key={index}>
            {Object.keys(data).length > 0 ?
                <div
                    className="border border-gray-100 shadow-sm rounded mr-3 transition hover:shadow-md group-hover:opacity-75 bg-white">
                    {data.data.vehicle_class.vehicle_class_photo !== undefined ?
                        <Image
                            className="w-full rounded rounded-b-none h-32"
                            imagePath={data.data.vehicle_class.vehicle_class_photo}
                        />
                        : null
                    }
                    <div className="mt-3 p-3">

                        {/* {JSON.stringify(data.data)} */}
                        <div className=" mb-4 text-xs">
                            <h1 className="text-lg text-gray-900 font-medium">{data.data.vehicle_class ? data.data.vehicle_class.name : null}</h1>
                            <div className="flex justify-between mt-4">
                                <div>
                                    <span className="bg-[#54d1bb] text-slate-50 p-1 rounded text-sm">
                                        4.4/5
                                    </span>
                                </div>
                                <div>
                                    <span className="text-green-600">
                                        Average
                                    </span>
                                    <span className="text-[11px]">(30 reviews)</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex mt-5">
                                    <span className="mr-10 ">Form</span>

                                    <div className="flex text-[#54d1bb] -ml-9">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg><span className="text-sm">{data.data.total_fare.toLocaleString()}</span>
                                    </div>


                                </div>
                                <div className="flex justify-between">
                                    <span>Per Night</span>
                                    <p>See Details</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                : null
            }
        </div>

    )
}

export default vehicleFareList