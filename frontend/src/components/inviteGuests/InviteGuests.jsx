import React, { useEffect, useState } from "react";
import Form from "@components/inviteGuests/form/Form";
import GuestsList from "@components/inviteGuests/GuestsList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import "./InviteGuests.css";

function InviteGuests() {
  const [listOfGuest, setListOfGuest] = useState([]);
  const [newGuest, setNewGuest] = useState({});
  const [show, setShow] = useState(false);
  const [handelError, setHandelError] = useState("");
  const [varient, setVarient] = useState("");

  useEffect(() => {
    guestItems();
  }, []);
  const guestItems = () => {
    axios.get("http://localhost:5000/guests").then((respons) => {
      console.log(respons.data);
      setListOfGuest(respons.data);
    });
  };
  const updateGuest = (list) => {
    setNewGuest(list);
  };
  const deleteGuest = (id) => {
    axios.delete(`http://localhost:5000/guests/${id}`).then(() => {
      guestItems();
      setHandelError("An item deleted!");
      setShow(true);
      setVarient("warning");
    });
  };
  return (
    <section className="table-container">
      {show && (
        <Alert
          className="alert-link"
          variant={varient}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>{handelError}</Alert.Heading>
        </Alert>
      )}
      <Form guestItems={guestItems} newGuest={newGuest} />
      <table className="table table-striped table-bordered table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Invited</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Number</th>
          </tr>
        </thead>
        <tbody>
          {listOfGuest.map((list) => (
            <GuestsList
              key={list.id}
              list={list}
              updateGuest={updateGuest}
              deleteGuest={deleteGuest}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default InviteGuests;
