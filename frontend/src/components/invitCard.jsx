import React from "react";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
function InvitCard({ info }) {
  const handleClick = () => {
    fetch(`${backendURL}/contact/${info.id}`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((data) => {
      console.warn(data.status); // talker to delete
    });
  };
  const handleDelete = () => {
    fetch(`${backendURL}/contact/${info.id}`, {
      method: "DELETE",
    });
  };
  return (
    <div>
      {info ? (
        <>
          <ul className="invitCard">
            <li>{info.name}</li>
            <li>{info.email}</li>
            <li>{info.message}</li>
          </ul>
          <button type="submit" onClick={handleClick}>
            send invit & delete
          </button>
          <button type="submit" onClick={handleDelete}>
            delete only
          </button>
        </>
      ) : null}
    </div>
  );
}

export default InvitCard;
