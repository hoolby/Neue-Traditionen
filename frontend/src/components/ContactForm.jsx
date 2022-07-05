import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    const details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    })
      .then((reply) => {
        setStatus("Submit");
        return reply.json();
      })
      .then(alert("message sent"))
      .then(navigate("/"));
  };
  let navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Name:
          <input type="text" id="name" placeholder="first name" required />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            placeholder="exemple@exemple.com"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="message">
          Message:
          <textarea
            id="message"
            placeholder="You want to talk with someone?"
            required
          />
        </label>
      </div>
      <button type="submit">{status}</button>
    </form>
  );
}

export default ContactForm;
