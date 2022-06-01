import React from "react";
import "./FunnelCard.css";

function FunnelCard(props) {
  //   let toggleInfo = document.getElementById("card-button");
  return (
    <div className="card-container">
      <img className="card-img" src={props.testArray.img} alt="" />
      <div className="card-info">
        <span className="card-title">{props.testArray.title}</span>
        <span className="card-body">{props.testArray.body}</span>
      </div>
      {/* <div className="card-button"></div> */}
    </div>
  );
}

export default FunnelCard;
