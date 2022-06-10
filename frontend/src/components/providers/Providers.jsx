/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import Form from "@components/form/Form";
import ProvidersList from "./ProvidersList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Providers.css";

function Providers() {
  const [providers, setProviders] = useState([
    {
      id: 1,
      title: "number 1",
      mobile: "4364",
      email: "a@a.gmail.com",
    },
    {
      id: 2,
      title: "number 2",
      mobile: "45643",
      email: "a@a.gmail.com",
    },
    {
      id: 3,
      title: "number 3",
      mobile: "798",
      email: "a@a.gmail.com",
    },
    {
      id: 4,
      title: "number 4",
      mobile: "131432",
      email: "a@a.gmail.com",
    },
    {
      id: 5,
      title: "number 5",
      mobile: "",
      email: "a@a.gmail.com",
    },
    {
      id: 6,
      title: "number 6",
      mobile: "433144",
      email: "a@a.gmail.com",
    },
    {
      id: 7,
      title: "number 7",
      mobile: "4657",
      email: "a@a.gmail.com",
    },
    {
      id: 8,
      title: "number 8",
      mobile: "789",
      email: "a@a.gmail.com",
    },
  ]);
  const [updateItem, setUpdateItem] = useState({});
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
  };

  return (
    <section className="table-container">
      <Form onEdite={updateItem} onAdd={addTodo} />

      <table className="table table-striped table-bordered table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <ProvidersList
              key={provider.id}
              provider={provider}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Providers;
