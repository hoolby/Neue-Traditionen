import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const NavbarDesktop = () => {
  return (
    <div>
      <ul className="menu">
        <li>
          <Link to="/">Funeral</Link>
        </li>

        <li>
          <Link to="/">Grief</Link>
        </li>
        <li>
          <Link to="/">Matching</Link>
        </li>
        <li>
          <Link to="/">Blog</Link>
        </li>
        <li>
          <Link to="/">About us</Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li>
          <Link to="/">Event</Link>
        </li>
      </ul>
    </div>
  );
};
export default NavbarDesktop;