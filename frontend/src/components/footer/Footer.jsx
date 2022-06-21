// eslint-disable-next-line import/no-unresolved
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <section className="feedback">
          <h3>Give us Feedback!</h3>
          <p>Write us an Email</p>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-envelope" color="white" />
            <a href="mailto: info@NeueTraditionen.de" className="email-link">
              info@NeueTraditionen.de
            </a>
          </div>
        </section>
        <section className="more-info">
          <ul className="info-left">
            <li>
              <Link to="/">About us</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Shop</Link>
            </li>
          </ul>
          <ul className="info-right">
            <li>
              <Link to="/">
                <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
export default Footer;
