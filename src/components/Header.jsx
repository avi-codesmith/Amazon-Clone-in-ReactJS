import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../components/header.css";
import logo from "../asset/logo.png";
import cart from "../asset/cart.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { getCategories } from "../store/fetchCategories";
import { getProductsByCategory } from "../store/fetchProductByCategories";
import { getProductBySearch } from "../store/fetchProductsBySearch";
import searchIcon from "../asset/search.svg";
import { Form } from "react-router-dom";
import Skeleton from "./Skeleton";

export default function Header() {
  const { category: categoryName } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);
  const { loading: productsByCategoryLoading } = useSelector(
    (state) => state.productsByCategory,
  );
  const { totalQuantity } = useSelector((state) => state.cartProducts);

  const {
    categories,
    loading: categoryLoading,
    error,
  } = useSelector((state) => state.categories);

  function handleInput(value) {
    setInputValue(value);
  }

  function handleFetchSearch(e) {
    window.scrollTo({
      top: 0,
    });
    e.preventDefault();
    if (inputValue !== "") {
      navigate(`/search?q=${inputValue}`);
      if (!inputValue.trim()) return;
      dispatch(getProductBySearch(inputValue));
      setInputValue("");
    } else {
      window.location.reload();
    }
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  let content;

  if (categoryLoading) {
    content = <Skeleton skeleton="category" />;
  }

  if (error) {
    content = "An error occured! cant fetch categories";
  }

  useEffect(() => {
    if (categoryName) {
      dispatch(getProductsByCategory({ category: categoryName, limit: 18 }));
    }
  }, [categoryName]);

  let UpdatedCategoryArr;

  if (categories) {
    const SlicedArr = categories.slice(1);
    UpdatedCategoryArr = SlicedArr;
  }

  return (
    <>
      {(loading || productsByCategoryLoading || categoryLoading) && <Loader />}
      <header className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <nav className="navigation">
          <Form onSubmit={(e) => handleFetchSearch(e)} className="search">
            <input
              type="search"
              placeholder="Search Amazon"
              value={inputValue}
              onChange={(e) => handleInput(e.target.value)}
            />
            <button className="search-btn">
              <img src={searchIcon} alt={"search"} />
            </button>
          </Form>

          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive ? "active nav-item cart" : "nav-item cart"
            }
          >
            <div className="cartWrapper">
              <img src={cart} alt="cart" />
              <span className="cartNumber">{totalQuantity}</span>
            </div>
            <p className="hide pd">Cart</p>
          </NavLink>
        </nav>
      </header>
      <header className="product-list">
        <ul>
          <div>{content}</div>
          {UpdatedCategoryArr.map((category) => (
            <NavLink
              to={`category/${category}`}
              key={category}
              id={category}
              className={({ isActive }) =>
                `${isActive ? "active" : ""} ${
                  productsByCategoryLoading ? "disabled" : ""
                }`
              }
            >
              <li>{category}</li>
            </NavLink>
          ))}
        </ul>
      </header>
    </>
  );
}
