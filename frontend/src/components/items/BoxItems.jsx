
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Items.css";


const BoxItems = ({ items }) => {
  return (
    <>
      <Link to={items.link} className="box-item">
        <span className="box-item-icon">
          <FontAwesomeIcon icon={items.icon} color="#156064" />
        </span>
        <p className="box-item-text">{items.text}</p>
      </Link>
    </>
  );
};
export default BoxItems;
