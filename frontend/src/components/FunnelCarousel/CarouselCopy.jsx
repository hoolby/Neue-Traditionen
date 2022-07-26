import Register from "@components/Register";
import FunnelCard from "@components/Funnel/FunnelCard";
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import sections from "../Funnel/sectionsCopy";
import LastStepOfCarousel from "@components/LastStepOfCarousel";

import "./Carousel.css";
import axios from "axios";

function ControlledCarousel() {
  const [index, setIndex] = useState(0); //   index of the carousel's current step
  const [selection, setSelection] = useState({}); // object with all selections the user has made
  const [userMail, setUserMail] = useState(null); // to be set in final step (in LastStepOfCarousel component)

  const selectOption = (
    option,
    choicescategory,
    choicetitle,
    choicecost,
    choiceIndex,
    multiplechoice
  ) => {
    // Multiple choice
    if (multiplechoice) {
      // Some choice has been made already at the current step
      ////// Remove choice if previously selected
      if (
        selection[choicescategory] &&
        (selection[choicescategory][0]?.includes(choicetitle) ||
          selection[choicescategory][1]?.includes(choicetitle) ||
          selection[choicescategory][2]?.includes(choicetitle) ||
          selection[choicescategory][3]?.includes(choicetitle) ||
          selection[choicescategory][4]?.includes(choicetitle) ||
          selection[choicescategory][5]?.includes(choicetitle) ||
          selection[choicescategory][6]?.includes(choicetitle) ||
          selection[choicescategory][7]?.includes(choicetitle) ||
          selection[choicescategory][8]?.includes(choicetitle) ||
          selection[choicescategory][9]?.includes(choicetitle) ||
          selection[choicescategory][10]?.includes(choicetitle) ||
          selection[choicescategory][11]?.includes(choicetitle) ||
          selection[choicescategory][12]?.includes(choicetitle) ||
          selection[choicescategory][13]?.includes(choicetitle) ||
          selection[choicescategory][14]?.includes(choicetitle))
      ) {
        // OPTION 1:  try to target delete the choice from the Array directly
        // selection[choicescategory].delete(
        //   selection[choicescategory].indexOf(choicetitle)
        // );

        // OPTION 2:  Filter the array
        selection[choicescategory] = selection[choicescategory].filter(
          (el) => el[0] !== choicetitle
        );
        setSelection({ ...selection });
      }

      ////// add another choice
      else if (selection[choicescategory]) {
        selection[choicescategory].push([choicetitle, choicecost]);
        console.log(selection);

        setSelection({ ...selection });
      }

      // No choice made yet at the current step
      else {
        // Use an Array with all selected options
        option[choicescategory] = new Array([choicetitle, choicecost]);
        setSelection({ ...selection, ...option });
      }
    }

    // Single item only-choice
    else {
      setSelection({ ...selection, ...option });
      handleSelect(choiceIndex + 1);
    }
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [showRegisterComponent, setShowRegisterComponent] = useState(false);

  // Getting all categories and options from DB
  // NOT WORKING:     HOW TO MAKE THE AXIOS CALL CORRECTLY???
  // const [sections, setSections] = useState([]);
  // axios.get("localhost:5000/selectionprocess").then((res) => setSections(res));

  return !showRegisterComponent ? (
    <Carousel
      className="carousel"
      interval={null}
      variant="dark"
      activeIndex={index}
      onSelect={handleSelect}
      id="myCarousel"
    >
      {sections.map((choices, choiceIndex) => {
        //  map over "data sections" aka card categories and their category index
        return (
          <Carousel.Item key={choices.category}>
            <h1>{choices.instruction}</h1>
            <div className="card-carousel-container">
              <section className="card-list">
                {choices.setofchoices.map((choice) => {
                  return (
                    <FunnelCard
                      choice={choice}
                      choices={choices}
                      selectOption={selectOption}
                      choiceIndex={choiceIndex}
                      multiplechoice={choices.multiplechoice}
                      selection={selection}
                    />
                  );
                })}
              </section>
            </div>
          </Carousel.Item>
        );
      })}
      <Carousel.Item>
        <LastStepOfCarousel
          selection={selection}
          setUserMail={setUserMail}
          setShowRegisterComponent={setShowRegisterComponent}
        />
      </Carousel.Item>
    </Carousel>
  ) : (
    <Register userMail={userMail} />
  );
}

export default ControlledCarousel;
