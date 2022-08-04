/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./FunnelCard.css";

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
      <div className="card-container">
        <img className="card-img" src={choice.img} alt="" />
        <div className="card-info">
          <span className="card-title">{choice.title}</span>
          <span className="card-body">{choice.body}</span>
        </div>
        <Button
          choice={choice}
          choices={choices}
          id="selection1"
          onClick={(e) => {
            const obj = {};
            obj[choices.category] = choice.title;
            selectOption(obj, choiceIndex, multiplechoice);
          }}
        >
          BootstrapButton
        </Button>
        <button type="button" onClick={handleShow} className="card-button">
          Click
        </button>
      </div>
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
