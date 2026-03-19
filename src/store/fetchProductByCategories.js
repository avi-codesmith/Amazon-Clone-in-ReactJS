import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsByCategories } from "../http/http";

const initialState = {
  loading: false,
  error: false,
  categories: [],
};

export const getProductsByCategory = createAsyncThunk(
  "getProductsByCategory",
  async ({ category }) => {
    let categoryName;
    if (category) {
      categoryName = category;
    }
    const data = await fetchProductsByCategories(categoryName);
    return data;
  },
);

export const fetchProductsByCategoriesSlice = createSlice({
  name: "getProductsByCategory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.products;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
