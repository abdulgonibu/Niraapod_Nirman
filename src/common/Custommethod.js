import moment from 'moment';

export const MomentDateConvertion = (dateString="",format='YYYY-MM-DD') => {
    var dateObj = new Date(dateString);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format(format);
    return momentString
}


export const RatingText = (rating) => {
    let stringRating="Poor"
    if(rating>=2 && rating<=3){
        stringRating="Good"
    } else if(rating>3 && rating<=4){
        stringRating="Very Good"
    }else if(rating>4){
        stringRating="Excellent"
    }
    return stringRating
}


