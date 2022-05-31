import React, { useState } from "react";
import NavbarDesktop from "./NavbarDesktop";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const TopBarMobail = () => {
  const [toggle, setToggle] = useState(false);
  const handelClick = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    console.log(toggle);
  };

  return (
    <div>
      <nav className="navbar-dark btn-mobile">
        <button
          className="navbar-toggler"
          type="button"
          onClick={(e) => handelClick(e)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <div className={toggle ? "show" : "heid"}>
        <NavbarDesktop />
      </div>
    </div>
  );
};
export default TopBarMobail;
