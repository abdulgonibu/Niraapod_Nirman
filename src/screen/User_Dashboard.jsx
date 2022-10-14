import { Link } from "react-router-dom";
import MobileNav from "../common/MobileNav";
import Nav from "../common/Nav";

const UserDashboard = () => {
    return (
        <div>
            <MobileNav />
            <nav className="bg-[#00294d]">
                <div className="hidden md:block">
                    <Nav
                        home="Home"
                        Explore="Explore"
                        Help="Help"
                    />
                </div>
            </nav>

            <div className='container py-10 mt-5'>
                <h1 className='font-semibold '>Account Settings</h1>
                <p className='text-xs text-gray-600'>Manage your Niraapod Travels experience.</p>
                <div className='grid grid-cols-3 gap-6'>
                    <Link to="/personal-details">
                        <div className='flex bg-[#fef9f4] my-5 p-2 py-5 gap-3 rounded shadow'>
                            <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="27.5" cy="27.5" r="27" stroke="#232323" stroke-opacity="0.5" />
                                <path d="M26.6842 24.6141C25.804 25.5033 24.6133 26 23.375 26C22.1367 26 20.946 25.5033 20.0658 24.6141C19.185 23.7244 18.6875 22.5146 18.6875 21.25C18.6875 19.9854 19.185 18.7756 20.0658 17.8859C20.946 16.9967 22.1367 16.5 23.375 16.5C24.6133 16.5 25.804 16.9967 26.6842 17.8859C27.565 18.7756 28.0625 19.9854 28.0625 21.25C28.0625 22.5146 27.565 23.7244 26.6842 24.6141ZM13.0844 38.5C13.0836 38.4999 13.0828 38.4999 13.0818 38.4998C13.0657 38.4987 13.0328 38.4956 12.9893 38.4883C12.8952 38.4724 12.7924 38.4435 12.7075 38.4007C12.6288 38.3609 12.5935 38.3241 12.5742 38.2948C12.5606 38.2742 12.5 38.1781 12.5 37.9167C12.5 37.2554 12.8699 35.5557 14.3863 34.0241C15.8577 32.5378 18.5395 31.0833 23.375 31.0833C28.2105 31.0833 30.8923 32.5378 32.3637 34.0241C33.8801 35.5557 34.25 37.2554 34.25 37.9167C34.25 38.1781 34.1894 38.2742 34.1758 38.2948C34.1565 38.3241 34.1212 38.3609 34.0425 38.4007C33.9576 38.4435 33.8548 38.4724 33.7607 38.4883C33.7172 38.4956 33.6843 38.4987 33.6682 38.4998C33.6672 38.4999 33.6664 38.4999 33.6656 38.5H13.0844Z" stroke="#232323" stroke-opacity="0.8" stroke-width="3" />
                            </svg>

                            <div>
                                <h1 className='font-semibold'>Personal details</h1>
                                <p className='text-gray-500 text-sm '>Update your info and find out how it is used. Manage personal details.</p>
                            </div>

                        </div>
                    </Link>
                    <Link to="/tour-package-booking-list"><div className='flex bg-[#fef9f4] my-5 p-2 py-5 gap-3 rounded shadow'>
                        <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="27.5" cy="27.5" r="27" stroke="#232323" stroke-opacity="0.5" />
                            <path d="M27.5 15C29.8776 15 31.8125 17.019 31.8125 19.5H34.6875C34.6875 15.3645 31.4632 12 27.5 12C23.5368 12 20.3125 15.3645 20.3125 19.5V22.5H18.875C17.2894 22.5 16 23.8455 16 25.5V39C16 40.6545 17.2894 42 18.875 42H36.125C37.7106 42 39 40.6545 39 39V25.5C39 23.8455 37.7106 22.5 36.125 22.5H23.1875V19.5C23.1875 17.019 25.1224 15 27.5 15ZM36.1279 39H28.9375V35.583C29.7928 35.0625 30.375 34.1055 30.375 33C30.375 31.3455 29.0856 30 27.5 30C25.9144 30 24.625 31.3455 24.625 33C24.625 34.104 25.2072 35.0625 26.0625 35.583V39H18.875V25.5H36.125L36.1279 39Z" fill="#232323" fill-opacity="0.8" />
                        </svg>
                        <div>
                            <h1 className='font-semibold'>Tour Package List</h1>
                            <p className='text-gray-500 text-sm '>See your package details .</p>
                        </div>
                    </div>
                    </Link>


                    <Link to="/hotel-booking-list">
                        <div className='flex bg-[#fef9f4] my-5 p-2 gap-3 py-5 rounded shadow'>
                            <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="27.5" cy="27.5" r="27" stroke="black" stroke-opacity="0.25" />
                                <path d="M36 24V22H22V24H36ZM36 32V27H22V32H36ZM36 20C36.5304 20 37.0391 20.2107 37.4142 20.5858C37.7893 20.9609 38 21.4696 38 22V32C38 32.5304 37.7893 33.0391 37.4142 33.4142C37.0391 33.7893 36.5304 34 36 34H22C21.4696 34 20.9609 33.7893 20.5858 33.4142C20.2107 33.0391 20 32.5304 20 32V22C20 20.89 20.89 20 22 20H36ZM18 36H33V38H18C17.4696 38 16.9609 37.7893 16.5858 37.4142C16.2107 37.0391 16 36.5304 16 36V25H18V36Z" fill="#232323" fill-opacity="0.8" />
                            </svg>


                            <div>
                                <h1 className='font-semibold'>Hotel Booking List</h1>
                                <p className='text-gray-500 text-sm '>See your hotel booking details</p>
                            </div>

                        </div>
                    </Link>
                    <Link to="/user-trip-list">
                        <div className='flex bg-[#fef9f4] my-5 p-2 gap-3 py-5 rounded shadow'>
                            <svg width="40" height="40" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-sm'>
                                <g clip-path="url(#clip0_0_1)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M36.8625 31.705C35.9322 32.7263 34.8491 33.6413 33.6332 34.3807C33.4831 34.4911 33.2806 34.5044 33.1139 34.3973C31.3176 33.253 29.8082 31.8785 28.6222 30.3844C26.9852 28.3284 25.9553 26.0496 25.6027 23.854C25.2434 21.6284 25.5794 19.486 26.6857 17.7452C27.1214 17.0576 27.6785 16.4306 28.3572 15.8893C29.9177 14.6452 31.7001 13.9869 33.4771 14.0002C35.1871 14.0135 36.8758 14.6518 38.3347 15.9864C38.8474 16.4525 39.2777 16.9871 39.6303 17.567C40.8203 19.5292 41.0766 22.0314 40.554 24.5668C40.038 27.0723 38.7571 29.6177 36.8625 31.7003V31.705ZM24.2254 28.3177C24.7819 28.3177 25.2334 28.7699 25.2334 29.3271C25.2334 29.885 24.7819 30.3365 24.2254 30.3365H15.5574L13.3062 38.9814H42.679L40.3402 30.2607C40.1968 29.7228 40.5162 29.1702 41.0527 29.0266C41.59 28.8829 42.1418 29.2021 42.2852 29.7401L44.9495 39.675C44.982 39.7747 44.9999 39.8804 44.9999 39.9908C44.9999 40.548 44.5484 41.0002 43.9919 41.0002H12.0047V40.9969C11.9216 40.9969 11.8373 40.9862 11.753 40.965C11.2157 40.8253 10.893 40.2761 11.0325 39.7381L13.7883 29.1549C13.87 28.6795 14.2837 28.3177 14.7818 28.3177H24.2254ZM33.1378 18.1893C35.3166 18.1893 37.083 19.9581 37.083 22.1398C37.083 24.3214 35.3166 26.0902 33.1378 26.0902C30.959 26.0902 29.1926 24.3214 29.1926 22.1398C29.1926 19.9581 30.959 18.1893 33.1378 18.1893Z" fill="#232323" fill-opacity="0.74" />
                                </g>
                                <circle cx="27.5" cy="27.5" r="27" stroke="#232323" stroke-opacity="0.5" />
                                <defs>
                                    <clipPath id="clip0_0_1">
                                        <rect width="34" height="27" fill="white" transform="translate(11 13)" />
                                    </clipPath>
                                </defs>
                            </svg>



                            <div>
                                <h1 className='font-semibold'>Trip List</h1>
                                <p className='text-gray-500 text-sm '>See your trip & rate it.</p>
                            </div>

                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default UserDashboard