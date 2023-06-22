import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistsItems: localStorage.getItem("wishlistItems") ? JSON.parse(localStorage.getItem("wishlistItems")) : [],
}

export const wishlistsSlice = createSlice({
    name: 'wishlists',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            let eachWishproductIndex = state.wishlistsItems.findIndex((item) => item?.id === action.payload?.id);

            if (eachWishproductIndex >= 0) {
                alert('Already added in Wishlist!');
            } else {
                let assembledItem;
                assembledItem = { ...action.payload }
                state.wishlistsItems.push(assembledItem);
                localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistsItems));
            }
        },

        //remove from wishlist

        removeWishlist: (state, action) => {

            const updatedWishlists = state.wishlistsItems?.filter((item) => item?.id !== action.payload?.id)

            state.wishlistsItems = updatedWishlists;

            localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistsItems));

        },

        clearWishlists: (state, action) => {
            state.wishlistsItems = [];
            localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistsItems));
        }

    },
})

// Action creators are generated for each case reducer function
// export const { } = cartsSlice.actions

export const { addToWishList, removeWishlist, clearWishlists } = wishlistsSlice.actions

export default wishlistsSlice.reducer