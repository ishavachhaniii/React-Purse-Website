import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../screens/CartSlice";
import wishlistsSlice from '../screens/WishSlice';

export const store = configureStore({
    reducer: {
      allCart: cartReducer,
      wishlists : wishlistsSlice
    },
  });