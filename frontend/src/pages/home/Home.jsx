/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
/* import BlogList from "@components/blogs/BlogList"; */
import HomeBlogs from "@pages/HomeBlogs";
/* import useFetch from "@components/blogs/useFetch"; */
import Items from "../../components/items/Items";
import AdminPage from "../adminpage/Adminpage";
import HomepageSection1 from "@components/HomepageSection1";
import "./Home.css";
import "@components/blogs/blog.css";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
function Home() {
  const [showAdmin, setShowAdmin] = useState(true);
  /*   const { data, isPending, error } = useFetch(`${backendURL}/blogs`); */
  return (
    <>
      {!showAdmin ? (
        <AdminPage />
      ) : (
        <>
          <HomepageSection1 />
          <section className="home-container">
            <h5 className="mt-5 item-title">So funktioniert es:</h5>
            <Items />
            <button className="item-button">JETZT STARTEN</button>
            <div className="home">
              <HomeBlogs />
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default Home;
