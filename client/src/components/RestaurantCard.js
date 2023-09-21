import { useState } from "react";
import { CDN_URL } from "../utils/constants.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AddToLikes } from "../utils/OrderSlice";

//create restaurant-card component
const RestaurantCard=(props) =>{
    const { resData }=props;
    const [liked,setLiked]=useState(false);
    const dispatch=useDispatch();
   

    console.log('resData',resData);
    
    const handleHeartIconClick = async(e) => {
        // Prevent the click event from propagating to the parent link
        console.log('clicked');
        e.stopPropagation();
        if( !liked ){
            console.log('liked');
            dispatch(AddToLikes(resData));
        }
        setLiked(!liked);
        
    
    };

    const heartIconClass = liked ? "ri-heart-fill clr" : "ri-heart-line";


    return (
        <div className="res-card w-72">
            <img className="ml-6 w-10/12 mr-8 mt-3 h-40 rounded-md"
                alt="res-logo" 
                src={
                    CDN_URL +
                    resData.data.cloudinaryImageId}
            />
            <div className="flex items-center">
                <h3 className="ml-6 pt-1 font-semibold">{ resData.data.name } </h3>
                <div  className="pt-2 pl-2"><i onClick={(e)=>handleHeartIconClick(e)} className={heartIconClass}></i> </div>
            </div>
             <div className="ml-6 text-sm-custom mt-1">
                {resData.data.cuisines.join(', ')}
            </div>
            <div className="flex mt-2 ml-6">
                <div className="flex items-center h-5 w-11 gap-1 py-0 px-1 color-custom text-sm-custom">
                    <span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>    
                    </span>    
                    <span className="relative top-1-custom  mb-1">{ resData.data.avgRating}</span>
                </div>
                <div className="ml-2 relative bottom-1">•</div>
                <span className="text-sm-custom ml-1">{ resData.data.deliveryTime } minutes</span>
                <div className="ml-2 relative bottom-1">•</div>
                <span className="text-sm-custom ml-1"> { resData.data.costForTwoString }  </span>
               
            </div>
        </div>
    );
};

export default RestaurantCard;