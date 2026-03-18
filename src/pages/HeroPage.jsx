import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/fetchRandomProducts";

export default function Hero() {
  const dispatch = useDispatch();
  const { productsData, loading } = useSelector((state) => state.products);
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.productsByCategory,
  );
  const [limit, setLimit] = useState(20);
  const [append, setAppend] = useState([]);
  // const [skip, setSkip] = useState(0);

  function handleLimit() {
    setLimit((prev) => prev + 10);
  }

  useEffect(() => {
    dispatch(getProducts(10));
  }, []);

  useEffect(() => {
    if (productsData?.length > 0) {
      setAppend(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoryLoading) {
      setAppend([]);
    }
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0) {
      setAppend(categories);
      console.log(categories);
    }
  }, [categories]);

  useEffect(() => {
    console.log("categories:", categories);
  }, [categories]);

  function loadMore() {
    dispatch(getProducts(limit));
  }

  return (
    <section className="hero">
      <h1>Explore Our products</h1>
      <div className="products">
        {append.length > 0 &&
          append.map((products) => (
            <div className="product" key={products.id}>
              <div className="product-image">
                <img src={products.images[0]} alt={products.title} />
              </div>
              <h1 className="product-title">{products.title}</h1>
              <h2 className="product-price">$ {products.price}</h2>
              <div className="rating">
                <p className="star">
                  {"★".repeat(Math.round(products.rating))}
                  {"☆".repeat(5 - Math.round(products.rating))}
                </p>
              </div>
              <div className="tags">
                {products.tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
              <p className="description">{products.description}</p>
            </div>
          ))}
      </div>
      {productsData.length > 0 && productsData.length <= 100 && (
        <button
          disabled={loading}
          className="show-btn"
          onClick={() => {
            loadMore();
            handleLimit();
          }}
        >
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
    </section>
  );
}
