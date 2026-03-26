import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

export default function Products({ append, heading }) {
  function handleScroll() {
    window.scrollTo({
      top: 0,
      // behavior: "smooth ",
    });
  }
  const { loading } = useSelector((state) => state.products);
  return (
    <>
      <h1 className="regular-heading">{heading}</h1>
      {loading ? (
        <Skeleton skeleton={"product"} />
      ) : (
        <>
          <div className="products" onClick={handleScroll}>
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
        </>
      )}
    </>
  );
}
