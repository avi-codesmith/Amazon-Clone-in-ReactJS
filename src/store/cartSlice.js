import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [{ quantity: 1 }] };

export const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.cartItems.findIndex(
        (product) => product.id === action.payload,
      );

      if (existingProductIndex === -1) {
        state.cartItems.push({
          id: action.payload,
        });
      } else {
        const data = state.cartItems[existingProductIndex].quantity++;
        console.log(state.cartItems[0]);
      }
      console.log(state.cartItems + "array products");
      console.log(action.payload + "action payload");
      console.log(existingProductIndex + "number");
    },
    RemoveFromCart: (state) => {
      state.quantity--;
    },
  },
});

export const cartActions = cartSlice.actions;
