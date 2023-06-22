import { createSlice } from "@reduxjs/toolkit";
import { products } from "../helpers/DummyProduct";
import fire from "../helpers/db";

const cartItemsFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cart: cartItemsFromStorage,
  items: products,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex((item) => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1, // Default quantity of 1
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // addToCart: (state, action) => {
    //   let find = state.cart.findIndex((item) => item.id === action.payload.id);
    //   if (find >= 0) {
    //     state.cart[find].quantity += 1;
    //   } else {
    //     state.cart.push(action.payload);
    //   }
    //   localStorage.setItem("cart", JSON.stringify(state.cart));
    // },
    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { enterPrice, quantity } = cartItem;
          console.log(enterPrice, quantity);
          const itemTotal = enterPrice * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // increaseItemQuantity: (state, action) => {
    // state.cart = state.cart.map((item) => {
    //   if (item.id === action.payload) {
    //     return { ...item, quantity: item.quantity + 1 };
    //   }
    //   return item;
    // });
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: parseInt(item.quantity) + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            // quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            quantity: item.quantity - (item.quantity > 1 ? 1 : 0),
          };
        }
        return item;
      });
    },
    // decreaseItemQuantity: (state, action) => {
    //   state.cart = state.cart.map((item) => {
    //     if (item.id === action.payload) {
    //       return {
    //         ...item,
    //         quantity: item.quantity > 1 ? item.quantity - 1 : 1,
    //       };
    //     }
    //     return item;
    //   });
    // },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
      const db = fire.firestore();
      db.collection("cart").doc("documentId").delete();
    },
  },
});
export const {
  addToCart,
  getCartTotal,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
