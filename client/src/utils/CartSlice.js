import { createSlice } from "@reduxjs/toolkit";

const  CartSlice= createSlice({
    name:"cart",
    initialState:{
        cartCount:0,
        items:[],
        resId:0,
    },
    reducers:{
        AddResId:(state,action)=>{
            state.resId=action.payload;
        },
        AddToCart:(state,action)=>{
            state.cartCount+=1;

            console.log('ac',action.payload);
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.item.id);
            if(existingItemIndex !== -1){
                state.items[existingItemIndex].quantity += 1;
            } 
            else{
                const newItem = { ...action.payload.item, quantity: 1 ,resId:action.payload.resId}; // Create a new object with the added quantity property
                state.items.push(newItem); // Push the new item into the items array
            }
            // or
            // state.items = [...state.items, action.payload]; // Create a new array with the updated items
        },
        ClearCart:(state,)=>{
            state.cartCount=0;
            state.items=[];
        },
        RemoveFromCart:(state,action)=>{
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if(existingItemIndex !== -1){
                state.cartCount-=1;
                if(state.items[existingItemIndex].quantity > 0){
                    state.items[existingItemIndex].quantity-=1;
                    if(state.items[existingItemIndex].quantity===0){
                        state.items.splice(existingItemIndex, 1);
                    }
                } 
            } 

            if(state.cartCount === 0){
                state.resId=0;
            }
        }
    },
});


export const {AddToCart,RemoveFromCart,ClearCart,AddResId} =CartSlice.actions;
export default CartSlice.reducer;
