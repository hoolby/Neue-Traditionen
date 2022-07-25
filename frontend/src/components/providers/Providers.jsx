import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "@components/providers/form/Form";
import Alert from "react-bootstrap/Alert";
import ProvidersList from "./ProvidersList";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Providers.css";

const backendURL =
  process.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
function Providers() {
  const [providers, setProviders] = useState([]);
  const [editProvider, setEditProvider] = useState({});
  const [show, setShow] = useState(false);
  const [handelError, setHandelError] = useState("");
  const [varient, setVarient] = useState("");
  useEffect(() => {
    providerList();
    /* console.log(providers); */
  }, []); // eslint-disable-line
  const providerList = () => {
    axios.get(`${backendURL}/provider`).then((respons) => {
      setProviders(respons.data);
    });
  };

  const updateProvider = (provider) => {
    setEditProvider(provider);
  };

  const deleteProvider = (id) => {
    /* console.log(id); */
    axios.delete(`${backendURL}/provider/${id}`).then((respons) => {
      /* console.log(respons); */
      providerList();
      setHandelError("A provider deleted!");
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
      <Form editProvider={editProvider} providerList={providerList} />

      <table className="table table-striped table-bordered table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <ProvidersList
              key={provider.id}
              provider={provider}
              updateProvider={updateProvider}
              deleteProvider={deleteProvider}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Providers;
