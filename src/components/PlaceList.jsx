import Image from '../common/Image'


const PlaceList = ({ place, index }) => {
    return (
        <div className="relative" key={index}>
            {place.gallery_images !== undefined ?
                <Image
                    className="w-full h-full"
                    imagePath={place.gallery_images[0]?.image}
                />
                : null
            }
            <div>
                <p className="absolute top-3 right-3 rounded text-white text-sm shadow bg-[#f65f13] p-1 px-2">

                    {place.gallery_images !== undefined ?
                        place.distrcits[0].name
                        : null
                    }
                </p>
                <p className="absolute bottom-10 text-2xl font-medium text-gray-900 left-5">{place.hotel_name} </p>
                <p className="text-sm absolute bottom-4 text-white left-5"> <span className="text-orange-500"><i
                    className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i><i
                        className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i> <i
                            className="fa-solid fa-star-half-stroke"></i></span> ({place.hotel_reviews.length} reviews)
                </p>
            </div>
        </div>
    )


}
export default PlaceList