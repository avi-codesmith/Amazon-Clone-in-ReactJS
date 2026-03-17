import { NavLink } from "react-router-dom";
import "../components/header.css";
import logo from "../asset/logo.png";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function Header() {
  const { loading } = useSelector((state) => state.products);
  console.log(loading);
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
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </header>
    </>
  );
}
