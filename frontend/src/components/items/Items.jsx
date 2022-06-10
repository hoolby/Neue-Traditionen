
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BoxItems from "./BoxItems";
import Checkbox from "./Checkbox";
import "./Items.css";

const Items = () => {
  const [infos, setInfos] = useState([
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
  const [checkedOne, setCheckedOne] = React.useState(true);
  const [checkedTwo, setCheckedTwo] = React.useState(true);
  const [checkedThree, setCheckedThree] = React.useState(true);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };
  const handleChangeThree = () => {
    setCheckedThree(!checkedThree);
  };

  return (
    <>
      <div className="items-container">
        {infos.map((items, index) => {
          return <BoxItems key={index} items={items} />;
        })}

        <div className="check-box">
          <Checkbox
            label="Choose funeral providers according to your wishes and needs"
            value={checkedOne}
            onChange={handleChangeOne}
          />
          <Checkbox
            label="Make informed decisions"
            value={checkedTwo}
            onChange={handleChangeTwo}
          />
          <Checkbox
            label="Plan everything online in one place"
            value={checkedThree}
            onChange={handleChangeThree}
          />
        </div>
      </div>
    </>
  );
};
export default Items;
