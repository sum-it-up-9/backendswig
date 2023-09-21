import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:"user",
    initialState:{
        isLoggedin:false,
        email:'',
        items:[],
        currOrderRes:{},
       
    },
    reducers:{
        SetLoggedIn:(state,action)=>{
            state.isLoggedin=true; 
            state.items=action.payload.items;
            state.email=action.payload.email;
        },
        AddCurrentOrder:(state,action)=>{

            const currentDate = new Date();
            // Extract the components of the date
            const month = currentDate.toLocaleString('en-US', { month: 'long' });
            const day = currentDate.getDate();
            const year = currentDate.getFullYear();

            // Construct the formatted date string
            const formattedDate = `${month} ${day}, ${year}`;

            state.items.push({cartItems:action.payload.cartItems,OrderInfo:action.payload.OrderInfo, Date:formattedDate });
            state.currOrderRes=action.payload.OrderInfo;
        }
     
    }
})  



export const {SetLoggedIn,AddCurrentOrder} =UserSlice.actions;
export default UserSlice.reducer;
