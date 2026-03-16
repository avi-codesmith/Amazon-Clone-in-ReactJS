import { useQuery } from "@tanstack/react-query";
import { fetchRandomProducts } from "../http/http";
import { useState, useEffect } from "react";

export default function Hero() {
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(10);

  const [productsData, setProductsData] = useState([]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchRandomProducts(10, 0, signal),
  });

  useEffect(() => {
    if (data) {
      setProductsData(data.products);
    }
  }, [data]);

  function handleLimit() {
    setLimit((prev) => prev + 10);
    setSkip((prev) => prev + limit);
  }

  async function loadMore() {
    const newData = await fetchRandomProducts(limit, skip);

    setProductsData((prev) => [...prev, ...newData.products]);
  }

  if (isPending) return "Loading...";
  if (isError) return <div>{error.message}</div>;

  console.log(productsData);

  return (
    <section className="hero">
      <h1>Explore Our products</h1>

      <div className="products">
        {productsData.length > 0 &&
          productsData.map((products) => (
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
      <button
        className="show-btn"
        onClick={() => {
          loadMore();
          handleLimit();
        }}
      >
        Show More
      </button>
    </section>
  );
}
