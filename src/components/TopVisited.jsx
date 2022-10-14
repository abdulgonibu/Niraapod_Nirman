import PlaceList from '../components/PlaceList'
const TopVistedPlaces = ({ heading, places = [] }) => {
    return (
        <div className="container md:-mt-24">
            <h1 className="md:text-4xl text-center font-medium text-[#7a003c]">{heading}</h1>
            <div className="grid md:grid-cols-3 gap-5 my-10 shadow-md">
                {places.map((place, index) => (
                    <div className="grid gap-4">
                        {index < 4 ?
                            <PlaceList
                                place={place}
                                index={index}
                            />

                            : null
                        }
                        {index === 4 ?
                            <PlaceList
                                place={place}
                                index={index}
                            />
                            : null
                        }
                    </div>
                ))}
            </div>
        </div>
    )


}
export default TopVistedPlaces