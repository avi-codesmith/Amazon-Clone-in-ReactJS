import { fetchCategorySlice } from "./fetchCategories";
import { fetchRandomProductsSlice } from "./fetchRandomProducts";
import { fetchProductsByCategoriesSlice } from "./fetchProductByCategories";
import { configureStore } from "@reduxjs/toolkit";
import { productDetailSlice } from "./fetchProductDetail";
import { ProductBySearchSlice } from "./fetchProductsBySearch";
import { cartSlice } from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: fetchRandomProductsSlice.reducer,
    categories: fetchCategorySlice.reducer,
    productsByCategory: fetchProductsByCategoriesSlice.reducer,
    getproductDetail: productDetailSlice.reducer,
    productBySearch: ProductBySearchSlice.reducer,
    cartProducts: cartSlice.reducer,
  },
});
