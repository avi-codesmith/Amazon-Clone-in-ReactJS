import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductBySearch } from "../http/http";

const initialState = {
  loading: false,
  error: false,
  SearchedProducts: [],
};

export const getProductBySearch = createAsyncThunk(
  "getProductBySearch",
  async (searchedValue) => {
    const data = await fetchProductBySearch(searchedValue);
    return data;
  },
);

export const ProductBySearchSlice = createSlice({
  name: "ProductBySlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.SearchedProducts = action.payload.products;
      })
      .addCase(getProductBySearch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
