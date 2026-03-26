import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/fetchRandomProducts";
import Products from "../components/Products";
import bgImg from "../asset/bg-wrapper-2.png";
// import ShowMoreBtn from "../components/ShowmoreBtn";
// import { Link, Outlet } from "react-router-dom";

export default function Hero({ reload }) {
  const dispatch = useDispatch();
  const { productsData } = useSelector((state) => state.products);
  // const { categories, loading: categoryLoading } = useSelector(
  //   (state) => state.productsByCategory,
  // );

  // const [append, setAppend] = useState([]);
  // const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(getProducts(18));
  }, [reload]);

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

  return (
    <>
      <div className="hero-img-w hide">
        <img src={bgImg} alt={"product"} />
      </div>
      <Products append={productsData} heading={"Explore our products"} />;
    </>
  );
}
