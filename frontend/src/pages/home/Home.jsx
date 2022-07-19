/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import BlogList from "@components/blogs/BlogList";
import useFetch from "@components/blogs/useFetch";
import Create from "@components/blogs/create";
import Items from "../../components/items/Items";
import AdminPage from "../adminpage/Adminpage";
import HomepageSection1 from "@components/HomepageSection1";
import "./Home.css";
import "@components/blogs/blog.css";

function Home() {
  const [showAdmin, setShowAdmin] = useState(true);
  const { data, isPending, error } = useFetch("http://localhost:5000/blogs");
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
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {data && <BlogList blogs={data} />}
              <Create />
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default Home;
