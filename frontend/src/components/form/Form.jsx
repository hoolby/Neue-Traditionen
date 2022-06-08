import React, { Component, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.css";

const Form = ({ onAdd, onEdite }) => {
  console.log(onEdite);
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

  const [title, setTitle] = useState(onEdite.title ? onEdite.title : "");
  const [mobile, setMobile] = useState(onEdite ? onEdite.mobile : "");
  const [email, setEmail] = useState(onEdite ? onEdite.email : "");

  //const [providerData, setProviderData] = useState([]);
  const handelSubmit = (e) => {
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
  };

  const animatedComponents = makeAnimated();
  return (
    <form className="form-container" onSubmit={handelSubmit}>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">Title</label>
          <input
            type="text"
            value={onEdite ? onEdite.title : title}
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
            value={onEdite ? onEdite.mobile : mobile}
            name={mobile}
            placeholder="Phone"
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <div className="valid-feedback">Please choose a mobile.</div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="validationCustom03">Email</label>
          <input
            type="email"
            value={onEdite ? onEdite.email : email}
            name={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            id="inputEmail4"
            placeholder="Email"
            required
          />
          <div className="valid-feedback">Please enter your Email.</div>
        </div>
      </div>

      {/* <div className="form-row">
        <div className="col-md-8 mb-3">
          <label>Services</label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={onEdite ? onEdite.services : services}
            options={options}
            onChange={(options) => setServices(options)}
          />
        </div>
      </div> */}

      {/* <button type="submit" class="btn btn-primary">
        Edit Provider
      </button> */}

      <button type="submit" class="btn btn-primary">
        Create Provider
      </button>
    </form>
  );
};
export default Form;
