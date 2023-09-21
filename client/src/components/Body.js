import RestaurantCard from "./RestaurantCard";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link, Navigate } from "react-router-dom";
import CarouselHome from "./CarouselHome";
import { useNavigate } from "react-router-dom";



//create body component
const Body= () =>{

    //creating state variable using useState() which is a function that returns array
    //searchText is variable name, "KFC" is initial value of variable
    //setsearchText is a function which lets us update the searchText variable
    const [searchText, setsearchText] = useState("");
    const [Restaurants, setRestaurants] = useState([]);
    const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
    const navigate = useNavigate();

    const URL='';
    
    //intial api call --- useEffect fnction gets called once after initial rendering
    //and second parameter is dependency, if dependacy changes useEffect will be called 
    
    useEffect(() => {
        getRestaurants();
    }, []);

    /*
    useEffect is now dependent on FilterdRestuarnats, so whenever FilterdRestuarnats changes i.e gets updated our useEffect will get called 
    useEffect(function ApiCall(){
        getRestaurants()
    },[FilteredRestaurants]);
    */

    function filterData(searchText,Restaurants){
        const filteredres= Restaurants.filter(function(x){
            console.log("filterdata called")
            return x.data.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredRestaurants(filteredres);
    }
    
    const handleResPage = (id)=>{
        navigate(`/restaurant/${id}`);
    }


    function sortbyoption(option){
        if(option==="deliveryTimeLowToHigh"){
            const sortedData=[...Restaurants].sort((a,b)=> a.data.deliveryTime > b.data.deliveryTime ?1 :-1);
            setFilteredRestaurants(sortedData);
            //console.log(sortedData);
        }
        else if (option==="rating"){
            const sortedData=[...Restaurants].sort((a,b)=> a.data.avgRating < b.data.avgRating ? 1 : -1);
            setFilteredRestaurants(sortedData);
        }
        else if(option==="costlowtohigh"){
            const sortedData=[...Restaurants].sort((a,b)=> {
                const costA = parseInt(a.data.costForTwoString.match(/\d+/)[0]);
                const costB = parseInt(b.data.costForTwoString.match(/\d+/)[0]);
                return costA > costB ? 1 : -1;
            });
            setFilteredRestaurants(sortedData);
        }
        else{
            const sortedData=[...Restaurants].sort((a,b)=> {
                const costA = parseInt(a.data.costForTwoString.match(/\d+/)[0]);
                const costB = parseInt(b.data.costForTwoString.match(/\d+/)[0]);
                return costA < costB ? 1 : -1;
            });
            setFilteredRestaurants(sortedData);
        }
    }



    async function getRestaurants(){
        try{
            const data= await fetch(`${URL}/home`);
            const json=await data.json();
          
           //if(!Restaurants) return
            //optinal chaining
            console.log(json,'js');
            setFilteredRestaurants(json?.data[0]?.data?.cards[2]?.data?.data?.cards);
            //console.log(json.data[0].data);
            setRestaurants(json?.data[0]?.data?.cards[2]?.data?.data?.cards);
        }catch (error){
            console.log(error);
        }
    }

    if(!Restaurants) return null;

    return Restaurants.length===0? (<Shimmer/>):(
        <div className="body">
            <CarouselHome/>
        
            <div className='pt-1 flex flex-wrap justify-center px-10  mt-5'>
                <input onChange={(e)=>{setsearchText(e.target.value)}} className='w-1/2 text-center h-10 border border-gray-400 rounded-l-full' type="text"  value={searchText}/>
                <button onClick={()=>{filterData(searchText,Restaurants)}} className='h-10 border border-gray-400 px-4 rounded-r-full bg-gray-100' ><i class="ri-search-line"></i></button>
           </div>
          
            
            <div className="flex flex-wrap  justify-center  mt-6">
                    <li onClick={()=> { sortbyoption("deliveryTimeLowToHigh")}} className="list-none mx-8 text-base font-family2 hover:font-bold hover:text-orange-500 hover:cursor-pointer" >Delivery Time</li>
                    <li onClick={()=> { sortbyoption("rating")}} className="list-none mx-8 text-base font-family2 hover:font-bold hover:text-orange-500 hover:cursor-pointer">Rating</li>
                    <li onClick={()=> { sortbyoption("costlowtohigh")}} className="list-none mx-8 text-base font-family2 hover:font-bold hover:text-orange-500 hover:cursor-pointer">Cost: Low To High</li>
                    <li onClick={()=> { sortbyoption("costhightolow")}} className="list-none mx-8 text-base font-family2 hover:font-bold hover:text-orange-500 hover:cursor-pointer">Cost: High To Low</li>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
                {
                    FilteredRestaurants.map(function dfs(x,index){
                        return <div className=" my-8  hover:shadow-2xl" key={index} onClick={() => handleResPage(x.data.id)}>
                            <RestaurantCard  resData={x} />
                            </div>
                    })
                }
            </div>
           
        </div>
    );
};

export default Body;