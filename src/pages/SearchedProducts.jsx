import { useSearchParams } from "react-router-dom";
import { getProductBySearch } from "../store/fetchProductsBySearch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Products from "../components/Products";
import { getProducts } from "../store/fetchRandomProducts";

export default function SearchedProducts() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const dispatch = useDispatch();
  const { SearchedProducts } = useSelector((state) => state.productBySearch);
  const { productsData } = useSelector((state) => state.products);

  useEffect(() => {
    if (query) {
      dispatch(getProductBySearch(query));
    }
  }, [query]);

  useEffect(() => {
    dispatch(getProducts(18));
  }, []);

  return (
    <>
      <Products
        append={SearchedProducts}
        heading={
          SearchedProducts.length == 0
            ? "Can't find anything related to your search"
            : "Your Search"
        }
      />
      <Products append={productsData} heading={"Explore other products"} />
    </>
  );
}
