/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AdminItems from "./AdminItems";
import "./AdminPage.css";

function AdminPage() {
  const [adminItems, setAdminItems] = useState([
    {
      title: "Edit checklist",
      image: "",
      body: "lab lab lab lab lab lab is lab lab lab yes",
      link: "/checklist",
    },
    {
      title: "Download price overview",
      image: "",
      body: "lab lab lab lab lab lab is lab lab lab yes",
      link: "/",
    },
    {
      title: "Select funeral provider",
      image: "",
      body: "lab lab lab lab lab lab is lab lab lab yes",
      link: "/providers",
    },
    {
      title: "Inform in the blog",
      image: "",
      body: "On click, you can add a new blog.",
      link: "/create",
    },
  ]);
  return (
    <div className="admin-container">
      <h3>What would you like to do next?</h3>
      <div className="admin-items">
        {adminItems.map((data, index) => {
          return <AdminItems key={index} data={data} />;
        })}
      </div>
    </div>
  );
}
export default AdminPage;
