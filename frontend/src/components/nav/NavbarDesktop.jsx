import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import logo from "../../assets/Logos/b7final1.png";

function NavbarDesktop() {
  const [user, loading, error] = useAuthState(auth); // eslint-disable-line
  return (
    <div>
      <ul className="menu">
        <li className="li-logo">
          <Link to="/">
            <img src={logo} alt="" style={{ height: "60px" }} />
          </Link>
        </li>
        <li className="li-centered li-pad">
          <Link to="/">Home</Link>
        </li>
        <li className="li-centered">
          <Link to="/carousel">Besttatung</Link>
        </li>
        <li className="li-centered">
          <Link to="/checklist">Checkliste</Link>
        </li>
        <li className="li-centered">
          <Link to="/blogs">Blogs</Link>
        </li>
        <li className="li-centered">
          <Link to="/aboutus">Über uns</Link>
        </li>
        {!user ? (
          <li className="li-centered">
            <Link to="/login">Einloggen</Link>
          </li>
        ) : (
          <li className="li-centered li-pad2">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
export default NavbarDesktop;
