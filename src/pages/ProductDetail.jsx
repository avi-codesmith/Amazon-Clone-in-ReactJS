import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getproductDetail } from "../store/fetchProductDetail";

export default function ProductDetail() {
  const { productDetail, loading, error } = useSelector(
    (state) => state.getproductDetail,
  );

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproductDetail(params.id));
  }, [dispatch, params.id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error</h2>;

  const fields = [
    { label: "Brand", value: productDetail.brand },
    { label: "Category", value: productDetail.category },
    { label: "Price", value: `$${productDetail.price}` },
    { label: "Discount", value: `${productDetail.discountPercentage}%` },
    { label: "Rating", value: productDetail.rating },
    { label: "Stock", value: productDetail.stock },
    { label: "Status", value: productDetail.availabilityStatus },
  ];

  console.log(productDetail);

  return (
    <div className="product-page">
      <h1 className="product-title">{productDetail.title}</h1>

      <div className="product-main">
        <img
          className="product-thumbnail"
          src={productDetail.thumbnail}
          alt={productDetail.title}
        />

        <div className="product-image-wrapper">
          {productDetail.images &&
            productDetail.images.length > 1 &&
            productDetail.images.map((image) => (
              <img key={image} src={image} className="product-images" />
            ))}
        </div>
      </div>

      <div className="product-info">
        {fields.map((item, index) => (
          <p key={index} className="product-field">
            <span className="label">{item.label}:</span>
            <span className="value"> {item.value}</span>
          </p>
        ))}
      </div>

      <p className="product-description">
        <span className="label">Description:</span>
        {productDetail.description}
      </p>

      <h3 className="section-title">Tags</h3>
      <ul className="tags">
        {productDetail.tags?.map((tag, i) => (
          <li key={i} className="tag-item">
            {tag}
          </li>
        ))}
      </ul>

      <h3 className="section-title">Reviews</h3>
      <div className="reviews">
        {productDetail.reviews?.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <b>{r.reviewerName}</b>
              <span className="rating">⭐ {r.rating}</span>
            </div>
            <p className="review-comment">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
