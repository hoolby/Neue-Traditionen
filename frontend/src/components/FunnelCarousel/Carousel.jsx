import Register from "@components/Register";
import FunnelCard from "@components/Funnel/FunnelCard";
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import sections from "../Funnel/sections";
import LastStepOfCarousel from "@components/LastStepOfCarousel";
import "./Carousel.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0); //   index of the carousel's current step
  const [selection, setSelection] = useState({}); // object with all selections the user has made
  const [userMail, setUserMail] = useState(null); // to be set in final step (in LastStepOfCarousel component)

  const selectOption = (option, choiceIndex) => {
    // option of?
    setSelection({ ...selection, ...option }); //  `${selection} + ${elementTitle}`
    handleSelect(choiceIndex + 1);
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [showRegisterComponent, setShowRegisterComponent] = useState(false);

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
          <Carousel.Item>
            <div className="card-carousel-container">
              <section className="card-list">
                {choices.map((choice) => {
                  return (
                    <FunnelCard
                      choice={choice}
                      selectOption={selectOption}
                      choiceIndex={choiceIndex}
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
