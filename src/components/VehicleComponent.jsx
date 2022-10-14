
import Image from '../common/Image'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const VehicleComponent = ({ data = {}, index }) => {
    let navigate = useNavigate()

    const CarDetailsNivigate = (data) => {
        navigate('/car-select?id=' + data.id, { state: data })
    }


    return (
        <>
            {Object.keys(data).length > 0 ?
                <div onClick={() => CarDetailsNivigate(data)} key={index}>
                    <div className="grid md:grid-cols-2 bg-gray-100 pb-5">
                        <div className="md:border-r border-gray-400 flex flex-col md:flex-row">
                            <Image
                                className="md:w-52 w-full h-32 p-2"
                                imagePath={data.vehicle_class.vehicle_class_photo}
                            />
                            <div className="p-3">
                                <h1 className="text-left text-gray-700 font-semibold">{data.district_from_details.name} to {data.district_to_details.name} -
                                    One way {data.vehicle_class.name} service</h1>
                                <div className="flex gap-2 mt-2 text-gray-600">
                                    <i class="fa-solid fa-location-dot mt-1"></i>
                                    <p>{data.district_from_details.name}</p>
                                </div>
                                {/* <div className="flex gap-2 text-gray-600">
                            <i class="fa-solid fa-clock mt-1 text-xs"></i>
                            <p>6 hours</p>

                        </div> */}
                                <div className="text-left p-1 items-start gap-1 bg-gray-50 w-20 shadow rounded justify-start flex mt-5">
                                    <i class="fa-solid fa-share text-xs "></i>
                                    <p className="  text-xs ">Day Tour</p>
                                </div>

                            </div>
                        </div>
                        <div className="md:mt-6 md:text-center text-left md:px-0 px-4">
                            <p className="text-lg font-bold text-gray-700"> ৳ {data.total_fare}</p>
                            {/* <p className="text-gray-00 text-xs mt-1">per person</p>
                    <p className="text-gray-00 text-xs mt-5">5% Disscount</p> */}
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default VehicleComponent