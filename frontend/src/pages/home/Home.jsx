import React from "react";
import Items from "../../components/items/Items";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <p className="item-title">Thats How it works</p>
      <Items />
      <button className="item-button">START NOW</button>
    </div>
  );
};
export default Home;
