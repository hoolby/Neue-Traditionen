import React from "react";

function InvitCard({ name, email, message, id }) {
  const handleClick = () => {
    fetch(`http://localhost:5000/contact/${id}`, {
      method: "POST",
    });
  };
  const handleDelete = () => {
    fetch(`http://localhost:5000/contact/${id}`, {
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
