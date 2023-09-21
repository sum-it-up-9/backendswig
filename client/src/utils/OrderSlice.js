import { createSlice } from "@reduxjs/toolkit";

const OrderSlice=createSlice({
    name:"order",
    initialState:{
        items:[]
    },
    reducers:{
        AddToLikes:(state,action)=>{

            const newItem = action.payload;
            // Check if an item with the same id already exists in the items array
            const existingItem = state.items.find((item) => item.data.id === newItem.data.id);

            if (!existingItem) {
                // Item is not in the array, so add it
                state.items.push(newItem);
            }

        },
        RemoveFromLikes:(state,action)=>{
            state.items = state.items.filter(item => item.data.id !== action.payload);
        }
    }
})  



export const {AddToLikes,RemoveFromLikes} =OrderSlice.actions;
export default OrderSlice.reducer;
