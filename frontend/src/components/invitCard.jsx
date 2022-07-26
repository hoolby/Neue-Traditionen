import React from "react";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
function InvitCard({ name, email, message, id }) {
  const handleClick = () => {
    fetch(`${backendURL}/contact/${id}`, {
      method: "POST",
    });
  };
  const handleDelete = () => {
    fetch(`${backendURL}/contact/${id}`, {
      method: "DELETE",
    });
  };
  return (
    <div>
      <ul className="invitCard">
        <li>{name}</li>
        <li>{email}</li>
        <li>{message}</li>
      </ul>
      <button type="submit" onClick={handleClick}>
        send invit & delete
      </button>
      <button type="submit" onClick={handleDelete}>
        delete only
      </button>
    </div>
  );
}

export default InvitCard;
