/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import BoxItems from "./BoxItems";
import Checkbox from "./Checkbox";
import "./Items.css";

function Items() {
  const [infos, setInfos] = useState([
    {
      link: "/",
      icon: "fa-solid fa-sliders",
      text: "Elemente für die Bestattung auswählen",
    },
    {
      link: "/",
      icon: "fa-solid fa-scroll",
      text: "Kostenorientierung herunterladen",
    },
    {
      link: "/checklist",
      icon: "fa-solid fa-list-check",
      text: "Checkliste für deine Planung abhaken und online speichern",
    },
  ]);
  const [checkedOne] = React.useState(true);
  const [checkedTwo] = React.useState(true);
  const [checkedThree] = React.useState(true);

  const handleChangeOne = () => {};
  const handleChangeTwo = () => {};
  const handleChangeThree = () => {};

  return (
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
  );
}
export default Items;
