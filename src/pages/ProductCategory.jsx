import { useEffect } from "react";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/fetchRandomProducts";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";

export default function ProductCategory() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.productsByCategory,
  );
  const { productsData, loading } = useSelector((state) => state.products);

  // useEffect(() => {
  //   if (productsData?.length > 0) {
  //     setAppend(productsData);
  //   }
  // }, [productsData]);

  // useEffect(() => {
  //   if (categoryLoading || loading) {
  //     setAppend([]);
  //   }
  // }, [categories]);
  useEffect(() => {
    dispatch(getProducts(18));
  }, []);

  return (
    <>
      <Products
        append={categories}
        heading={`Explore ${category}` || "Explore Products"}
      />
      <Products append={productsData} heading={"Explore more"} />
    </>
  );
}
