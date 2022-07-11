/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import BlogList from "@components/blogs/BlogList";
import useFetch from "@components/blogs/useFetch";
import Create from "@components/blogs/CreateBlog";
import Items from "../../components/items/Items";
import AdminPage from "../adminpage/Adminpage";
import "./Home.css";
import "@components/blogs/blog.css";

function Home() {
  const [showAdmin, setShowAdmin] = useState(true);
  const { data, isPending, error } = useFetch("http://localhost:5000/blogs");
  return (
    <div>
      {!showAdmin ? (
        <AdminPage />
      ) : (
        <section className="home-container">
          <p className="item-title">Thats How it works</p>
          <Items />
          <button className="item-button">START NOW</button>
          <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data && <BlogList blogs={data} />}
          </div>
        </section>
      )}
    </div>
  );
}
export default Home;
