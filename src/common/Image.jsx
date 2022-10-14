import React from 'react';
import {isValidURL} from '../constants/customMethod'

const Image = ({ className,imagePath,alt="No Image" }) => {
    return (

        <img data-text="IMG1" className={className} src={isValidURL(imagePath)} alt={alt} />
       
    )
}
export default Image;
