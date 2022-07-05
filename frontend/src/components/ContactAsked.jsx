/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
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
  };

  return (
    <div>
      {invitAsked.map((invit) => (
        <InvitCard key={invit.id} {...invit} />
      ))}
      <button type="button" onClick={getInvit}>
        See new talker
      </button>
    </div>
  );
}

export default ContactAsked;
