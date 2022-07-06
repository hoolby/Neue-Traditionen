import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "@components/form/Form";
import ProvidersList from "./ProvidersList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Providers.css";

function Providers() {
  const [providers, setProviders] = useState([]);
  const [editProvider, setEditProvider] = useState({});
  useEffect(() => {
    providerList();
    /* console.log(providers); */
  }, []); // eslint-disable-line
  const providerList = () => {
    axios.get("http://localhost:5000/provider").then((respons) => {
      setProviders(respons.data);
    });
  };

  const updateProvider = (provider) => {
    setEditProvider(provider);
  };

  const deleteProvider = (id) => {
    /* console.log(id); */
    axios.delete(`http://localhost:5000/provider/${id}`).then((respons) => {
      /* console.log(respons); */
      providerList();
    });
  };

  return (
    <section className="table-container">
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
