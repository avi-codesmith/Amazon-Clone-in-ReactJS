import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRandomProducts } from "../http/http";

const initialState = { productsData: [], loading: false, error: false };

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async function (limit) {
    const data = await fetchRandomProducts(limit);
    return data;
  },
);

export const fetchRandomProductsSlice = createSlice({
  name: "fetchRandomProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsData = action.payload.products;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
