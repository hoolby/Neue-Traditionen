import React, { useState } from "react";
import BoxItems from "./BoxItems";
import "./Items.css";

function Items() {
  const [infos /* , setInfos */] = useState([
    {
      link: "/",
      icon: "fa-solid fa-sliders",
      text: "Choosing items for the burial",
    },
    {
      link: "/",
      icon: "fa-solid fa-scroll",
      text: "Download a list of possible costs as a guide",
    },
    {
      link: "/",
      icon: "fa-solid fa-list-check",
      text: "Check off the checklist with your to-dos & save everything online",
    },
  ]);
  /*  const [checkedOne] = React.useState(true);
  const [checkedTwo] = React.useState(true);
  const [checkedThree] = React.useState(true); */

  return (
    <div className="items-container">
      {infos.map((items, index) => {
        const test = index;
        return <BoxItems key={test} items={items} />;
      })}
    </div>
  );
}
export default Items;
