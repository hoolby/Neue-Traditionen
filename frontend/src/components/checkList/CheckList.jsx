import React, { useEffect, useState } from "react";
import Form from "@components/checkList/form/Form";
import CheckListItem from "@components/checkList/CheckListItem";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import "./CheckList.css";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";

function CheckList() {
  const [checklistList, setChecklistList] = useState([]);
  const [newItemchecklist, setNewItemchecklist] = useState({});
  const [show, setShow] = useState(false);
  const [handelError, setHandelError] = useState("");
  const [varient, setVarient] = useState("");

  useEffect(() => {
    checklistItems();
  }, []);

  /* const config = {
    headers: {
      authentication: localStorage.getItem("token"),
    },
  }; */
  const checklistItems = () => {
    axios
      .get(`${backendURL}/checklist`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((respons) => {
        console.warn(respons.data[1]);
        setChecklistList(respons.data[1]);
      });
  };
  const updateChecklist = (list) => {
    setNewItemchecklist(list);
  };
  const deleteChecklist = (id) => {
    axios.delete(`${backendURL}/checklist/${id}`).then(() => {
      checklistItems();
      setHandelError("An item deleted!");
      setShow(true);
      setVarient("warning");
    });
  };
  return (
    <section className="table-container">
      {show && (
        <Alert
          className="alert-link"
          variant={varient}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>{handelError}</Alert.Heading>
        </Alert>
      )}
      <Form
        checklistItems={checklistItems}
        newItemchecklist={newItemchecklist}
      />
      <table className="table table-striped table-bordered table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Done</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
          {checklistList.map((list) => (
            <CheckListItem
              key={list.id}
              list={list}
              updateChecklist={updateChecklist}
              deleteChecklist={deleteChecklist}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default CheckList;
