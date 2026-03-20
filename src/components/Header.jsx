import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../components/header.css";
import logo from "../asset/logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { getCategories } from "../store/fetchCategories";
import { getProductsByCategory } from "../store/fetchProductByCategories";
import { useLimit } from "../hooks/useLimit";
import { getProductBySearch } from "../store/fetchProductsBySearch";

export default function Header() {
  const { category: categoryName } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const { limit } = useLimit();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);
  const { loading: productsByCategoryLoading } = useSelector(
    (state) => state.productsByCategory,
  );

  const {
    categories,
    loading: categoryLoading,
    error,
  } = useSelector((state) => state.categories);

  function handleInput(value) {
    setInputValue(value);
  }

  function handleFetchSearch() {
    navigate(`/search?q=${inputValue}`);
    if (!inputValue.trim()) return;
    dispatch(getProductBySearch(inputValue));
    // setInputValue("");
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  let content;

  if (categoryLoading) {
    content = "Loading... pls wait";
  }

  if (error) {
    content = "An error occured! cant fetch categories";
  }

  useEffect(() => {
    if (categoryName) {
      dispatch(getProductsByCategory({ category: categoryName, limit }));
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
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="search">
          <input
            type="search"
            placeholder="Search Amazon.in"
            value={inputValue}
            onChange={(e) => handleInput(e.target.value)}
          />
          <button className="search-btn" onClick={handleFetchSearch}>
            search
          </button>
        </div>

        <nav className="navigation">
          <NavLink to="/" className="nav-item">
            Login
          </NavLink>

          <NavLink to="/" className="nav-item">
            Signup
          </NavLink>

          <NavLink to="/" className="nav-item cart">
            🛒 Cart
          </NavLink>
        </nav>
      </header>
      <header className="product-list">
        <ul>
          <p>{content}</p>
          {UpdatedCategoryArr.map((category) => (
            <Link
              to={`category/${category}`}
              key={category}
              id={category}
              className={productsByCategoryLoading ? "disabled" : undefined}
            >
              <li key={category}>{category}</li>
            </Link>
          ))}
        </ul>
      </header>
    </>
  );
}
