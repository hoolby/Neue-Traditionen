import React, { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit =  (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
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
    }).then((reply)=>{
      setStatus("Submit");
      return reply.json()
      //alert(result.status);
    }).then((data) =>{
      console.log(data); // this will be a string
    }); 
    
  }; 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="first name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder= "exemple@exemple.com" required />
      </div>
      <div>
        <label htmlFor="message" >Message:</label>
        <textarea id="message" placeholder="You want to talk with someone?" required />
      </div>
      <button type="submit">{status}</button>
    </form>
  );
};

export default ContactForm;