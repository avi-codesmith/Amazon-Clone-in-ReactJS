import { NavLink } from "react-router-dom";
import "../components/header.css";
import logo from "../asset/logo.png";

export default function Header() {
  return (
    <>
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
