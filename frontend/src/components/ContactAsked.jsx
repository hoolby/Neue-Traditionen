/* eslint-disable */
/* eslint-disable react/prop-types */

import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function ContactAsked() {
  const [data, setData] = useState([]);
  const fetchTalker = async () => {
    try {
      const q = query(collection(db, "talker"));
      const docs = await getDocs(q);
      const temp = [];
      docs.forEach((doc) => {
        temp.push({ ...doc.data() });
      });
      setData(temp);
    } catch (err) {
      console.error(err); 
      console.log("An error occured while fetching talker data");
    } console.log(data);
  };

  useEffect(() => {
    fetchTalker();
  }, []);

  return (
    <div>
      {data.map((info) => (
    <ul className="invitCard">
        <li>{info.name}</li>
        <li>{info.email}</li>
        <li>{info.message}</li>
      </ul>
      ))}
    </div>
  );
}

export default ContactAsked;




/* import React, { useState } from "react";
import axios from "axios";
import InvitCard from "@components/invitCard";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";

function ContactAsked() {
  const [invitAsked, setInvitAsked] = useState([]);

  const getInvit = (e) => {
    e.preventDefault();
    axios
      .get(`${backendURL}/contact`)
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

export default ContactAsked;  */
