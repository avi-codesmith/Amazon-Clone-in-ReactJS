import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../http/http";

const initialState = { loading: false, error: false, categories: [] };

export const getCategories = createAsyncThunk("getCategories", async () => {
  const data = await fetchCategories();
  return data;
});

export const fetchCategorySlice = createSlice({
  name: "getCategories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
