import { fetchCategorySlice } from "./fetchCategories";
import { fetchRandomProductsSlice } from "./fetchRandomProducts";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    products: fetchRandomProductsSlice.reducer,
    categories: fetchCategorySlice.reducer,
  },
});
