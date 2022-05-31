import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <section className="feedback">
          <h3>Give us Feedback!</h3>
          <p>
            What do you think we can do better? we look forward to your open
            opinion. Write to us
          </p>
          <a>info@emmora.de</a>
        </section>
        <section className="more-info">
          <ul className="info-left">
            <li>
              <Link to="/">About us</Link>
            </li>

            <li>
              <Link to="/">Plan burial</Link>
            </li>

            <li>
              <Link to="/">Checklist</Link>
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
              <Link to="/">Facebook</Link>
            </li>
            <li>
              <Link to="/">Instagram</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
export default Footer;
