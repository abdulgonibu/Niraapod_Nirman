import React from 'react';
import Image from '../common/Image'
const HotelThumbnail = ({images=[],ignore="",className="" }) => {
    return (
        <>
        {images.map((image,index)=>(
            <>
            {index!==ignore ?
            <>
                { className==='' ?
                <Image
                className={index===0 ? "thumb mt-1 md:w-20 activeimg" :"thumb mt-1 md:w-20 "} 
                imagePath={image.image}
                />
                : <Image
                className={className}
                imagePath={image.image}
                />
                }
            </>    
            :null
            } 
          </>
        ))}
      </>
       
    )
}
export default HotelThumbnail;
