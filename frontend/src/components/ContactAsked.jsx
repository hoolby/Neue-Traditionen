import React, { useState } from "react";
import axios from "axios";
import InvitCard from "@components/invitCard";

function ContactAsked() {
  const [invitAsked, setInvitAsked] = useState([]);

  const getInvit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/contact")
      .then((res) => res.data)
      .then((data) => {
        setInvitAsked(data);
      });
    /*       .catch((error) => {
        console.log(error.res);
      }); */
  };

  return (
    <div>
      {invitAsked.map((invit, id) => (
        <InvitCard key={id} {...invit} />
      ))}
      <button type="submit" onClick={getInvit}>
        See new talker
      </button>
    </div>
  );
}

export default ContactAsked;
