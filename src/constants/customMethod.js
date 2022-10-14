import {BASE_URL} from '../constants/api';

export const  isValidURL=(url)=> {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if(regexp.test(url)){
        return url
    }else{
       return BASE_URL+url 
    } 
    //return (res !== null)
};