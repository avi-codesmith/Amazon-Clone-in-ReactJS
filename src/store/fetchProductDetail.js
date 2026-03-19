import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductDetail } from "../http/http";

const initialState = {
  loading: false,
  error: false,
  productDetail: [],
};

export const getproductDetail = createAsyncThunk(
  "getproductDetail",
  async (params) => {
    const data = await fetchProductDetail(params);
    return data;
  },
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getproductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(getproductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});
