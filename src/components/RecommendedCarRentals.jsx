import { Link } from "react-router-dom";
import Slider from "react-slick";
import VehicleFareList from '../components/vehicleFareList'
const RecommendedCarRentals = ({recommendVehicles=[]}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        // autoplaySpeed: 500,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="container pb-10">
            <section id="courses" className="">
                <div className="container mx-auto">

                    <div className="flex justify-between">
                        <h1 className="md:text-3xl text-sm text-pink-600 md:text-center md:font-semibold py-2  md:py-2">Recommended Cars for Rentals</h1>
                        <Link to="/vehicle-list">
                            <button
                                className="transition bg-[#fe2b5c] hover:bg-[#2e2e2e] uppercase md:text-sm text-xs  md:px-4 md:p-2 md:my-1 p-1 border rounded text-white">
                                View More
                            </button>
                        </Link>

                    </div>

                    <div id="" className=" py-5">
                        <Slider {...settings}>
                        {recommendVehicles.map((recommendVehicle,index)=>(
                            <VehicleFareList
                            data={recommendVehicle}
                            index={index}
                            />
                          
                        ))}
                           
                        </Slider>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default RecommendedCarRentals