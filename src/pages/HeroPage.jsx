import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/fetchRandomProducts";
import { useLimit } from "../hooks/useLimit";
import ShowMoreBtn from "../components/ShowmoreBtn";

export default function Hero() {
  const dispatch = useDispatch();
  const { limit, handleLimit } = useLimit();
  const { productsData, loading } = useSelector((state) => state.products);
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.productsByCategory,
  );

  const [append, setAppend] = useState([]);
  // const [skip, setSkip] = useState(0);

  console.log(limit);

  useEffect(() => {
    dispatch(getProducts(limit));
  }, [limit]);

  useEffect(() => {
    if (productsData?.length > 0) {
      setAppend(productsData);
    }
  }, [productsData, limit]);

  useEffect(() => {
    if (categoryLoading) {
      setAppend([]);
    }
  }, [categories, limit]);

  useEffect(() => {
    if (categories.length > 0) {
      setAppend(categories);
      console.log(categories);
    }
  }, [categories, limit]);

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
        <ShowMoreBtn loadingState={loading} handleLimit={handleLimit} />
      )}
    </section>
  );
}
