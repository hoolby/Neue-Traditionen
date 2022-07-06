/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import "./FunnelCard.css";
import { Button, Modal } from "react-bootstrap";

function FunnelCard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* function toggleInfo() {
    document.getElementById("card-button").toggle("card-opened");
  } */
  return (
    <>
      <div className="card-container">
        <img className="card-img" src={props.testArray.img} alt="" />
        <div className="card-info">
          <span className="card-title">{props.testArray.title}</span>
          <span className="card-body">{props.testArray.body}</span>
        </div>
        <Button>BootstrapButton</Button>
        <button type="button" onClick={handleShow} className="card-button">
          Click
        </button>
      </div>
      <Modal
        size="xl"
        className="modal-dialog modal-xl centered"
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.testArray.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.testArray.body}</Modal.Body>
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
//       <img className="card-img" src={props.testArray.img} alt="" />
//       <div className="card-info">
//         <span className="card-title">{props.testArray.title}</span>
//         <span className="card-body">{props.testArray.body}</span>
//       </div>
//       <Button>asd</Button>
//       <button type="button" onClick={toggleInfo} className="card-button">
//         Click
//       </button>
//     </div>
//   );
// }

// export default FunnelCard;
