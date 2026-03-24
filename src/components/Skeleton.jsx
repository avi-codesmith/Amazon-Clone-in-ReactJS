import "./skeleton.css";

let items = [];
for (let i = 0; i < 18; i++) {
  items.push(
    <div className="card" key={i}>
      <div className="card-img"></div>
      <div className="card-title"></div>
      <div className="card-price"></div>
      <div className="card-rating"></div>
      <div className="card-des"></div>
    </div>,
  );
}

let categories = [];
for (let i = 0; i < 20; i++) {
  categories.push(<div className="box" key={i}></div>);
}

let productDetail = (
  <div class="skeleton-wrapper">
    <div class="left"></div>

    <div class="right">
      <div class="title"></div>
      <div class="desc"></div>
      <div class="price"></div>
      <div class="rating"></div>

      <div class="tags">
        <div></div>
        <div></div>
      </div>

      <div class="boxes">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default function Skeleton({ skeleton }) {
  return (
    <>
      {skeleton === "product" && <div className="card-wrapper">{items}</div>}
      {skeleton === "category" && <div className="category">{categories}</div>}
      {skeleton === "productDetail" && (
        <div className="productDetail">{productDetail}</div>
      )}
    </>
  );
}
