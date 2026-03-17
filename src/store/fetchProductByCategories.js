import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getProductsByCategory = createAsyncThunk(
  "getProductsByCategory",
  async () => {},
);
