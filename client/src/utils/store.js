import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import OrderSlice from "./OrderSlice";
import UserSlice from "./UserSlice";

const store= configureStore({
    reducer:{
        cart:CartSlice,
        order:OrderSlice,
        user:UserSlice,
    },
});

export default store;