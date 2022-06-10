import React, { Component, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.css";

const Form = ({ providerList /* onEdite */ }) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/createProvider", {
        title: title,
        mobile: mobile,
        email: email,
        price: price,
      })
      .then(() => {
        providerList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*   const options = [
    { value: "flowers", label: "Flowers" },
    { value: "gravestone", label: "Gravestone" },
    { value: "musician", label: "Musician" },
    { value: "spiker", label: "Spiker" },
    {
      value: "special urn or coffin of choice",
      label: "Special urn or coffin of choice",
    },
    {
      value: "commemorative notice in the local newspaper",
      label: "Commemorative notice in the local newspaper",
    },
  ]; */

  const [title, setTitle] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");

  const [providerData, setProviderData] = useState([]);
  /*  const handelSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Math.floor(Math.random() * 10000),
      title: title,
      mobile: mobile,
      email: email,
    });
    setTitle("");
    setMobile("");
    setEmail("");
  }; */

  const animatedComponents = makeAnimated();
  return (
    <form className="form-container" onSubmit={(e) => handelSubmit(e)}>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">Title</label>
          <input
            type="text"
            value={title}
            name={title}
            className="form-control"
            id="validationCustom01"
            placeholder="Name Provider"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="valid-feedback">Please choose a title.</div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom02">Mobile</label>
          <input
            type="number"
            className="form-control"
            id="validationCustom02"
            value={mobile}
            name={mobile}
            placeholder="Phone"
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <div className="valid-feedback">Please choose a mobile.</div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom03">Email</label>
          <input
            type="email"
            value={email}
            name={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            id="inputEmail3"
            placeholder="Email"
            required
          />
          <div className="valid-feedback">Please enter your Email.</div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom04">Price</label>
          <input
            type="number"
            value={price}
            name={price}
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
            id="inputPrice4"
            placeholder="Price"
            required
          />
          <div className="valid-feedback">Please enter your Price.</div>
        </div>
        {/* <div className="col-md-8 mb-3">
          <label>Services</label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={onEdite ? onEdite.services : services}
            options={options}
            onChange={(options) => setServices(options)}
          />
        </div> */}
      </div>

      {/* <button type="submit" class="btn btn-primary">
        Edit Provider
      </button> */}

      <button
        type="submit"
        class="btn btn-primary"
        /* onClick={(e) => createProvider(e)} */
      >
        Create Provider
      </button>
      <button
        type="button"
        class="btn btn-primary"
        onClick={(e) => providerList(e)}
      >
        Provider List
      </button>
    </form>
  );
};
export default Form;
