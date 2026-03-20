import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getproductDetail } from "../store/fetchProductDetail";
import Products from "../components/Products";
import { getProducts } from "../store/fetchRandomProducts";

export default function ProductDetail() {
  const { productDetail, loading, error } = useSelector(
    (state) => state.getproductDetail,
  );

  const [imgSrc, setImgSrc] = useState("");

  const { productsData } = useSelector((state) => state.products);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproductDetail(params.id));
    dispatch(getProducts(18));
    setImgSrc("");
  }, [dispatch, params.id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error</h2>;

  function handleSrc(image) {
    setImgSrc(image);
  }

  return (
    <>
      <div className="product-page">
        <div className="product-w">
          <div className="product-main">
            <img
              className="product-thumbnail"
              src={imgSrc || productDetail.thumbnail}
              alt={productDetail.title}
            />

            <div className="product-image-wrapper">
              {productDetail.images &&
                productDetail.images.length > 1 &&
                productDetail.images.map((image) => (
                  <button
                    key={image}
                    className="none"
                    onMouseMove={() => handleSrc(image)}
                  >
                    <img src={image} className="product-images" />
                  </button>
                ))}
            </div>
          </div>
          <div>
            <h1 className="product-title">{productDetail.title}</h1>
            <p className="description-d">
              {productDetail.description} A quality Product By{" "}
              <strong>{productDetail.brand}</strong>
            </p>

            <div className="product-info">
              {productDetail.stock < 50 && (
                <p className="limitedTime">Limited time deal</p>
              )}
              <div className="price">
                <p>-{productDetail.discountPercentage}%</p>
                <p className="product-price">$ {productDetail.price}</p>
                <p>Inclusive of all taxes</p>
              </div>

              <div className="star">
                {"★".repeat(Math.round(productDetail.rating))}
                {"☆".repeat(5 - Math.round(productDetail.rating))}
                <p className="ratingNo">{productDetail.rating}</p>
              </div>
            </div>

            <ul className="tags">
              {productDetail.tags?.map((tag, i) => (
                <li key={i}>
                  <p>{tag}</p>
                </li>
              ))}
              {productDetail.rating > 4 && (
                <p className="choice">Amazon's choice</p>
              )}
            </ul>

            <div className="boxes">
              {productDetail.returnPolicy != "No return policy" && (
                <div className="feture-box">
                  <h3>Return Policy Available</h3>
                  <p>{productDetail.returnPolicy}</p>
                </div>
              )}
              {productDetail.warrantyInformation && (
                <div className="feture-box">
                  <h3>Warranty is available</h3>
                  <p>{productDetail.warrantyInformation}</p>
                </div>
              )}
              {productDetail.shippingInformation && (
                <div className="feture-box">
                  <h3>Shipping Information</h3>
                  <p>{productDetail.shippingInformation}</p>
                </div>
              )}
            </div>
            <div className="action">
              <button className="btn light">Add to Cart</button>
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="white">
          <h3 className="section-title">Our Customer Reviews</h3>
          <div className="reviews">
            {productDetail.reviews?.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <b>{r.reviewerName}</b>
                  <p className="review-comment">{r.comment}</p>
                </div>
                <div className="star">
                  {"★".repeat(Math.round(r.rating))}
                  {"☆".repeat(5 - Math.round(r.rating))}
                  <p className="ratingNo">{r.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="size">
        <Products append={productsData} heading={"Explore more"} />
      </div>
    </>
  );
}
