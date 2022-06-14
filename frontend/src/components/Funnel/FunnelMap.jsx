import { useState } from "react";
import FunnelCard from "./FunnelCard";
import "./FunnelCard.css";
// import data from "./testDB";
import sections from "./sections";

function FunnelMap({ initialSelection }) {
  const [step, setStep] = useState(0);
  // !! set this selection default state to whtever data type needed on backened
  // !! array data type doesnt work
  const [selection, setSelection] = useState();
  const increaseStep = (elementTitle) => {
    setSelection(selection + " " + elementTitle); //  `${selection} + ${elementTitle}`
    setStep(step + 1);
  };
  console.log(selection);
  return (
    //    map over array of DB, key/value pairs, set a Key and passed array as prop
    <section className="card-list">
      {sections[step].map((choice) => {
        return (
          <FunnelCard
            increaseStep={increaseStep}
            choice={choice}
            selection={selection}
          />
        );
      })}
    </section>
  );
}

export default FunnelMap;
