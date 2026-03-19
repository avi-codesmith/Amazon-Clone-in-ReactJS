import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/fetchRandomProducts";
import { useLimit } from "../hooks/useLimit";
import ShowMoreBtn from "../components/ShowmoreBtn";
import { Link, Outlet } from "react-router-dom";

export default function Hero({ reload }) {
  const dispatch = useDispatch();
  const { limit, handleLimit } = useLimit();
  const { productsData, loading } = useSelector((state) => state.products);
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.productsByCategory,
  );

  const [append, setAppend] = useState([]);
  // const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(getProducts(limit));
  }, [limit, reload]);

  useEffect(() => {
    if (productsData?.length > 0) {
      setAppend(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoryLoading || loading) {
      setAppend([]);
    }
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0) {
      setAppend(categories);
    }
  }, [categories]);

  return (
    <div className="products">
      {append.length > 0 &&
        append.map((product) => (
          <Link
            to={`/productDetail/${product.id}`}
            key={product.id}
            className="product-link"
          >
            <div className="product">
              <div className="product-image">
                <img src={product.images[0]} alt={product.title} />
              </div>
              <h1 className="product-title">{product.title}</h1>
              <h2 className="product-price">$ {product.price}</h2>

              <div className="rating">
                <p className="star">
                  {"★".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </p>
              </div>

              <div className="tags">
                {product.tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>

              <p className="description">{product.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
