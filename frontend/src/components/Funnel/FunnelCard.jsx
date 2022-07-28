/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./FunnelCard.css";
import "../blogs/blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FunnelCard({
  choice,
  choices,
  selectOption,
  choiceIndex,
  multiplechoice,
  selection,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* function toggleInfo() {
    document.getElementById("card-button").toggle("card-opened");
  } */
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <div
          choice={choice}
          choices={choices}
          id="selection1"
          onClick={(e) => {
            const option = {};
            option[choices.category] = [choice.title, choice.cost];

            selectOption(
              option,
              choices.category,
              choice.title,
              choice.cost,
              choiceIndex,
              multiplechoice
            );
          }}
        >
          <Card.Img variant="top" src={choice.img} />
          <Card.Body className="card-body d-flex flex-column">
            <Card.Title>{choice.title}</Card.Title>
          </Card.Body>
        </div>
        <span
          className="mt-auto"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <FontAwesomeIcon
            icon="fa-question-circle"
            color="#c97c5d"
            style={{
              fontSize: "1.5rem",
              position: "relative",
              margin: "10px",
            }}
            onClick={handleShow}
          />
        </span>
      </Card>
      <Modal size="xl" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{choice.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{choice.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Choice
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FunnelCard;

// working ish before tests
// import React from "react";
// import "./FunnelCard.css";
// import Button from "react-bootstrap/Button";

// function FunnelCard(props) {
//   function toggleInfo() {
//     document.getElementById("card-button").toggle("card-opened");
//   }
//   //   let toggleInfo = document.getElementById("card-button");
//   return (
//     <div className="card-container">
//       <img className="card-img" src={choice.img} alt="" />
//       <div className="card-info">
//         <span className="card-title">{choice.title}</span>
//         <span className="card-body">{choice.body}</span>
//       </div>
//       <Button>asd</Button>
//       <button type="button" onClick={toggleInfo} className="card-button">
//         Click
//       </button>
//     </div>
//   );
// }

// export default FunnelCard;
