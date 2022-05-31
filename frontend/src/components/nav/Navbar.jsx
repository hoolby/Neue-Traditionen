import React from "react";
import NavbarDesktop from "./NavbarDesktop";
import TopBarMobail from "./TopBarMobail";
import "bootstrap/dist/css/bootstrap.min.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Navbar.css";

const Navbar = () => {
  const matches = useMediaQuery("(min-width:700px)");
  return (
    <div className="navbar">
      {matches ? <NavbarDesktop /> : <TopBarMobail className="mobail-nav" />}
    </div>
  );
};
export default Navbar;
