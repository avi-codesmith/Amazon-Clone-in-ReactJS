import { Link } from "react-router-dom";

export default function Products({ append }) {
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
