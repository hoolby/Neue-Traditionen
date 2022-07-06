/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Link } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import "./Form.css";

const schema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(255)
    .case("lower")
    .required("firstname is required")
    .messages({
      "string.base": `firstname should be a type of 'text'`,
      "string.min": `firstname should have at least 3 characters`,
      "string.max": `firstname should have less than 255 characters`,
      "string.empty": "firstname can't be empty",
      "string.required": `firstname is a required field`,
    }),
  lastname: Joi.string()
    .min(3)
    .max(255)
    .case("lower")
    .required("firstname is required")
    .messages({
      "string.base": `lastname should be a type of 'text'`,
      "string.min": `lastname should have at least 3 characters`,
      "string.max": `lastname should have less than 255 characters`,
      "string.empty": "lastname can't be empty",
      "string.required": `lastname is a required field`,
    }),
  number: Joi.string().trim().required().messages({
    "string.base": ` number should be a type of 'number'`,
    "string.empty": ` number cannot be an empty field`,
    // "string.base.patern": `"" 10 digital numbers`,
    "any.required": ` number is requireed`,
  }),
  checked: Joi.boolean(),
});

function Form({ newGuest, guestItems }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: "onBlur",
  });
  const valueOfChecked = !!newGuest.checked;
  const [show, setShow] = useState(false);
  const [handelError, setHandelError] = useState("");
  const [varient, setVarient] = useState("");
  useEffect(() => {
    if (newGuest.id) {
      setValue("firstname", newGuest.firstname);
      setValue("lastname", newGuest.lastname);
      setValue("number", newGuest.number);
      setValue("checked", valueOfChecked);
    }
  }, [newGuest]);
  const onSubmit = (data, e) => {
    const changeschecked = data.checked ? 1 : 0;
    const requestData = newGuest.id ? axios.put : axios.post;
    requestData("http://localhost:5000/guests", {
      firstname: data.firstname,
      lastname: data.lastname,
      number: data.number,
      checked: changeschecked,
      id: newGuest.id,
    })
      .then(() => {
        guestItems();
        e.target.reset();
        setHandelError("It was successfull");
        setShow(true);
        setVarient("success");
        setValue("firstname", "");
        setValue("lastname", "");
        setValue("number", "");
        setValue("checked", "");
        newGuest.id = null; //eslint-disable-line
      })
      .catch((err) => {
        if (err) {
          setHandelError(err.response.data.message);
          setShow(true);
          setVarient("danger");
        }

        // alert(err.response.data.message);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="form-row form-title">
        <h4>Add your guests</h4>
      </div>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">First Name</label>
          <input
            {...register("firstname")} //eslint-disable-line
            className={`form-control ${errors.firstname && "error-input"}`}
            id="validationCustom01"
            placeholder="First Name"
          />
          {errors.firstname && (
            <p className="error-message">{errors.firstname.message}</p>
          )}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom02">Last Name</label>
          <input
            {...register("lastname")} //eslint-disable-line
            className={`form-control ${errors.lastname && "error-input"}`}
            id="validationCustom02"
            placeholder="Last Name"
          />
          {errors.lastname && (
            <p className="error-message">{errors.lastname.message}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom03">Number</label>
          <input
            {...register("number")} //eslint-disable-line
            className={`form-control ${errors.number && "error-input"}`}
            id="validationCustom03"
            placeholder="Phone Number"
          />
          {errors.number && (
            <p className="error-message">{errors.number.message}</p>
          )}
        </div>
        <div className="col-md-4 mb-3">
          <input
            className="form-check-input gust-form-checkbox"
            {...register("checked")} //eslint-disable-line
            type="checkbox"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Invited!
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {newGuest.id ? "Edite Guest" : "Create Guest"}
      </button>
      <Link to="/checklist">
        <button type="submit" className="btn btn-success">
          Back to checklist page
        </button>
      </Link>
      <div className="form-row form-bottom" />
    </form>
  );
}
export default Form;
