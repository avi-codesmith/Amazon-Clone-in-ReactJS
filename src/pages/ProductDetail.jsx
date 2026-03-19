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

  return (
    <div>
      <h1>{productDetail.title}</h1>

      <img src={productDetail.thumbnail} width="250" />

      {fields.map((item, index) => (
        <p key={index}>
          <b>{item.label}:</b> {item.value}
        </p>
      ))}

      <p>
        <b>Description:</b> {productDetail.description}
      </p>

      <h3>Tags</h3>
      <ul>
        {productDetail.tags?.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      <h3>Reviews</h3>
      {productDetail.reviews?.map((r, i) => (
        <div key={i}>
          <b>{r.reviewerName}</b> ({r.rating})<p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
