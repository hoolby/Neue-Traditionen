import React from "react";

function InvitCard({ name, email, message }) {
  return (
    <ul className="invitCard">
      <li>{name}</li>
      <li>{email}</li>
      <li>{message}</li>
    </ul>
  );
}

export default InvitCard;
