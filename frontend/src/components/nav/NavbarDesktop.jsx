import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function NavbarDesktop() {
  const [user, loading, error] = useAuthState(auth); // eslint-disable-line
  return (
    <div>
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/carousel">Funeral</Link>
        </li>
        <li>
          <Link to="/checklist">Checklist</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/aboutus">About us</Link>
        </li>
        {!user ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
export default NavbarDesktop;
