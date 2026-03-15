import { useQuery } from "@tanstack/react-query";
import { fetchRandomProducts } from "../http/http";
import { useState } from "react";

export default function Hero() {
  const productsArr = [];
  const [limit, setLimit] = useState(10);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", limit],
    queryFn: () => fetchRandomProducts(limit),
  });

  let content;

  if (isPending) {
    content = "Loading...";
  }

  if (isError) {
    content = <div>{error}</div>;
  }

  if (data) {
    // content = data.products.map((product) => (
    //   <div className="product" key={product.id}>
    //     <div className="product-image">
    //       <img src={product.images[0]} alt={product.title} />
    //     </div>
    //     <h1 className="product-title">{product.title}</h1>
    //     <h2 className="product-price">$ {product.price}</h2>
    //     <div className="rating">
    //       <p className="star">
    //         {"★".repeat(Math.round(product.rating))}
    //         {"☆".repeat(5 - Math.round(product.rating))}
    //       </p>
    //     </div>
    //     <div className="tags">
    //       {product.tags.map((tag) => (
    //         <p key={tag}>{tag}</p>
    //       ))}
    //     </div>
    //     <p className="description">{product.description}</p>
    //   </div>
    // ));
    productsArr.push(data.products);
  }

  console.log(productsArr);

  function loadMore() {
    setLimit((prev) => prev + 20);
  }

  function loadLess() {
    setLimit((prev) => prev - 20);
  }

  const productsItems =
    productsArr.length > 0 &&
    productsArr[0].map((product) => (
      <div className="product" key={product.title}>
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
    ));

  return (
    <>
      <section className="hero">
        <h1>Explore Our products</h1>
        <div className="products">
          {productsItems}
          {content}
        </div>

        {limit <= 100 && (
          <button className="show-btn" onClick={loadMore}>
            Show More
          </button>
        )}

        {limit >= 20 && (
          <button className="show-btn" onClick={loadLess}>
            Show Less
          </button>
        )}
      </section>
    </>
  );
}
