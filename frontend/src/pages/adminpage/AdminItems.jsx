/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./AdminPage.css";

function AdminItems({ data }) {
  return (
    <section className="box-admin-item">
      <div className="admin-title">
        <span className="admin-item-icon">
          <FontAwesomeIcon
            icon="fa-solid fa-list-check"
            border
            color="#156064"
          />
        </span>
        <span className="admin-item-title">{data.title}</span>
      </div>
      <div className="admin-item-body">
        <img className="admin-item-body-imag" src="" />
        <article className="admin-item-body-bottem">
          {data.body}
          <button type="button" className="btn-detail">
            <Link to={data.link}>TO OVERVIEW</Link>
          </button>
        </article>
      </div>
    </section>
  );
}
export default AdminItems;
