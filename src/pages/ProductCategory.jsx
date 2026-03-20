import Products from "../components/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProductCategory() {
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

  return (
    <>
      <Products append={categories} heading={"Explore products"} />
      <Products append={productsData} heading={"Explore more"} />
    </>
  );
}
