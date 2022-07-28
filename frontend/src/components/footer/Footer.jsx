// eslint-disable-next-line import/no-unresolved
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
// import logo from "../../assets/Logos/b7final1.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <section className="feedback">
          <h3>Kontakt</h3>
          <p>Kontaktiere uns per Mail</p>
          <div className="logo-container">
            <FontAwesomeIcon icon="fa-solid fa-envelope" color="white" />
            <a href="mailto: info@NeueTraditionen.de" className="email-link">
              info@NeueTraditionen.de
            </a>
          </div>
        </section>
        {/* <img src={logo} className="logo-footer" alt="" /> */}
        <section className="more-info">
          <ul className="info-left">
            <li>
              <Link to="/aboutus">Über uns</Link>
            </li>
            <li>
              <Link to="/blogs">Blog</Link>
            </li>
          </ul>
          <ul className="info-right">
            {/* <li>
              <Link to="/">
                <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
              </Link>
            </li> */}
            <li>
              <a
                href="https://instagram.com/neuetraditionen?igshid=YmMyMTA2M2Y="
                target="blank"
              >
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
export default Footer;
