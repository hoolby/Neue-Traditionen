import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "@components/providers/form/Form";
import ProvidersList from "./ProvidersList";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import "./Providers.css";

function Providers() {
  const [providers, setProviders] = useState([]);
  const [editProvider, setEditProvider] = useState({});
  const [show, setShow] = useState(false);
  const [handelError, setHandelError] = useState("");
  const [varient, setVarient] = useState("");
  useEffect(() => {
    providerList();
  }, []);
  const providerList = () => {
    axios.get("http://localhost:5000/provider").then((respons) => {
      setProviders(respons.data);
    });
  };

  const updateProvider = (provider) => {
    setEditProvider(provider);
  };

  const deleteProvider = (id) => {
    axios.delete(`http://localhost:5000/provider/${id}`).then(() => {
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
