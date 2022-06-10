import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./Items.css";

function BoxItems({ items }) {
  return (
    <Link to={items.link} className="box-item">
      <span className="box-item-icon">
        <FontAwesomeIcon icon={items.icon} color="#156064" />
      </span>
      <p className="box-item-text">{items.text}</p>
    </Link>
  );
}

BoxItems.propTypes = {
  items: PropTypes.string.isRequired,
};

export default BoxItems;
