import React, { useState } from "react";
import BoxItems from "./BoxItems";
import "./Items.css";

function Items() {
  const [infos] = useState([
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
