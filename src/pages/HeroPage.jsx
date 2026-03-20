import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/fetchRandomProducts";
import { useLimit } from "../hooks/useLimit";
import Products from "../components/Products";
import ShowMoreBtn from "../components/ShowmoreBtn";
import { Link, Outlet } from "react-router-dom";

export default function Hero({ reload }) {
  const dispatch = useDispatch();
  const { limit, handleLimit } = useLimit();
  const { productsData, loading } = useSelector((state) => state.products);
  // const { categories, loading: categoryLoading } = useSelector(
  //   (state) => state.productsByCategory,
  // );

  const [append, setAppend] = useState([]);
  // const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(getProducts(limit));
  }, [limit, reload]);

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

  return <Products append={productsData} />;
}
