import React, { useEffect, useState } from "react";
import ProvidersList from "./ProvidersList";
import Form from "@components/form/Form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Providers.css";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  //const [newProvider, setNewProvider] = useState({});
  const providerList = () => {
    axios.get("http://localhost:5000/providerList").then((respons) => {
      console.log(respons.data);
      setProviders(respons.data);
    });
  };
  useEffect(() => {
    providerList();
  }, []);

  /*   const addNewProvider = (newProvider) => {
    //const newList = [newProvider, ...providers];
    //setProviders(newList);
    providerList();
  }; */
  const deleteProvider = (id) => {
    setProviders(providers.filter((item) => item.id !== id));
  };

  /*   const createProvider = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/createProvider", {
        title: title,
        mobile: mobile,
        email: email,
        price: price,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }; */
  /*  const [updateItem, setUpdateItem] = useState({});
  const addTodo = (todo) => {
    const newTodo = [todo, ...providers];
    setProviders(newTodo);
    console.log(todo, ...providers);
  };

  const updateTodo = (id) => {
    setUpdateItem(providers.find((item) => item.id === id));
    return updateItem;
  };

  const deleteTodo = (id) => {
    console.log(id);
    const newList = providers.filter((item) => item.id !== id);
    setProviders(newList);
  }; */

  return (
    <>
      <section className="table-container">
        <Form /* onEdite={updateItem} */ providerList={providerList} />

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
                /* 
                onUpdate={updateTodo}*/
                deleteProvider={deleteProvider}
              />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Providers;
