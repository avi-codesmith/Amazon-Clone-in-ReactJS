import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [], totalQuantity: 0 };

export const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.cartItems.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (existingProductIndex == -1) {
        state.cartItems.push({
          id: action.payload.id,
          title: action.payload.title,
          img: action.payload.img,
          price: action.payload.price,
          description: action.payload.description,
          quantity: 1,
          totalPrice: action.payload.price,
        });
        state.totalQuantity++;
      } else {
        const item = state.cartItems[existingProductIndex];
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity++;
      }
    },
    handleAddQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload,
      );

      if (item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
      }
      state.totalQuantity++;
    },

    handleDecQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload,
      );

      if (item) {
        state.totalQuantity--;
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (product) => product.id !== action.payload,
          );
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;
