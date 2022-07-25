import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
function ContactForm() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Submit");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    const details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    fetch(`${backendURL}/contact`, {
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
      .then(alert("Thank you, message sended"))
      .then(navigate("/"));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="name"
        htmlFor="name"
        label="Firstname"
        variant="outlined"
        required
      />
      <TextField
        id="email"
        htmlFor="email"
        label="email"
        variant="outlined"
        type="email"
        placeholder="exemple@exemple.com"
        helperText="valid email pls"
        required
      />
      <TextField
        id="message"
        htmlFor="message"
        label="Message"
        variant="outlined"
        placeholder="You want to talk with someone?"
        multiline
        maxRows={5}
        value={value}
        onChange={handleChange}
        required
      />
      <button type="submit">{status}</button>
    </Box>
  );
}

export default ContactForm;
