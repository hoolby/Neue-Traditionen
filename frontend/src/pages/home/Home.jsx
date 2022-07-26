/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
/* import BlogList from "@components/blogs/BlogList"; */
import HomeBlogs from "@pages/HomeBlogs";
/* import useFetch from "@components/blogs/useFetch"; */
import Items from "../../components/items/Items";
import AdminPage from "../adminpage/Adminpage";
import "./Home.css";
import "@components/blogs/blog.css";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
function Home() {
  const [showAdmin, setShowAdmin] = useState(true);
  /*   const { data, isPending, error } = useFetch(`${backendURL}/blogs`); */
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
            <HomeBlogs />
          </div>
        </section>
      )}
    </div>
  );
}
export default Home;
