import Products from "../components/Products";
import { useSelector } from "react-redux";

export default function ProductCategory() {
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.productsByCategory,
  );

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

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     setAppend(categories);
  //   }
  // }, [categories]);

  return <Products append={categories} />;
}
