import { NavLink } from "react-router-dom";
import "../components/header.css";
import logo from "../asset/logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { useEffect } from "react";
import { getCategories } from "../store/fetchCategories";

export default function Header() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);
  const {
    categories,
    loading: categoryLoading,
    error,
  } = useSelector((state) => state.categories);

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

  return (
    <>
      {loading && <Loader />}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="search">
          <input type="search" placeholder="Search Amazon" />
          <button className="search-btn">🔍</button>
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
          {categories.map((category) => (
            <li key={category} id={category}>
              {category}
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}
