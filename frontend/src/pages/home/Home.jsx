/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import BlogList from "@components/blogs/BlogList";
import Items from "../../components/items/Items";
import AdminPage from "../adminpage/Adminpage";
import "./Home.css";

function Home() {
  const [showAdmin, setShowAdmin] = useState(true);
  return (
    <div>
      {showAdmin ? (
        <AdminPage />
      ) : (
        <section className="home-container">
          <p className="item-title">Thats How it works</p>
          <Items />
          <button className="item-button">START NOW</button>
          <BlogList blogItems={blogItems} />
        </section>
      )}
    </div>
  );
}
export default Home;
