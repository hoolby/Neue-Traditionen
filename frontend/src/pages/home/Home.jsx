import React, { useState } from "react";
import Items from "../../components/items/Items";
import AdminPage from "../adminpage/Adminpage";
import BlogList from "@components/BlogList";
import "./Home.css";

const blogItems = [
  {
    title: "premier blog",
    body: "blogblogblogblogblogblog",
  },
  {
    title: "deuxième blog",
    body: "blogblogblogblogblogblog",
  },
  {
    title: "troisième blog",
    body: "blogblogblogblogblogblogblog",
  },
];
const Home = () => {
  const [showAdmin, setShowAdmin] = useState(true);
  return (
    <>
      {!showAdmin ? (
        <AdminPage />
      ) : (
        <section className="home-container">
          <p className="item-title">Thats How it works</p>
          <Items />
          <button className="item-button">START NOW</button>
          <BlogList blogItems={blogItems} />
        </section>
      )}
    </>
  );
};
export default Home;
