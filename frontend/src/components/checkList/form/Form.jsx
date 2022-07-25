/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import "./Form.css";

const backendURL =
  process.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";
const schema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.base": `title should be a type of 'text'`,
    "string.min": `title should have at least 3 characters`,
    "string.max": `title should have less than 255 characters`,
    "string.empty": "title can't be empty",
    "string.required": `title is a required field`,
  }),
  responsible: Joi.string().required(),
  checked: Joi.boolean(),
});

function Form({ checklistItems, newItemchecklist }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema), mode: "onBlur" });
  const [show, setShow] = useState(false);
  const [handelError, setHandelError] = useState("");
  const [varient, setVarient] = useState("");

  useEffect(() => {
    if (newItemchecklist.id) {
      setValue("title", newItemchecklist.title);
      setValue("responsible", newItemchecklist.responsible);
      setValue("checked", newItemchecklist.checked);
    }
  }, [newItemchecklist]); //eslint-disable-line

  const onSubmit = (data, e) => {
    const requestData = newItemchecklist.id ? axios.put : axios.post;
    requestData(
      `${backendURL}/checklist`,
      {
        title: data.title,
        responsible: data.responsible,
        checked: data.checked,
        id: newItemchecklist.id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then(() => {
        checklistItems();
        e.target.reset();
        setHandelError("It was successfull");
        setShow(true);
        setVarient("success");
        newItemchecklist.id = null; //eslint-disable-line
        setValue("title", "");
        setValue("responsible", "");
        setValue("checked", "");
      })
      .catch((err) => {
        setHandelError(err.response.data.message);
        setShow(true);
        setVarient("danger");
      });
  };

  return (
    <form
      className="form-container needs-validation"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <h4>Add checklist items</h4>
      </div>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">Title</label>
          <input
            {...register("title")} //eslint-disable-line
            className={`form-control ${errors.title && "error-input"}`}
            id="validationCustom01"
            placeholder="Title"
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">Responsible</label>
          <select
            name="responsible"
            className={`form-control ${errors.responsible && "error-input"}`}
            aria-label="Default select example"
            {...register("responsible", { required: "true" })} //eslint-disable-line
          >
            <option value="">-- How is responsible --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.responsible && (
            <p className="error-message">{errors.responsible.message}</p>
          )}
          {/* <select {...register("responsible")}>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select> */}
          {/* <input
            {...register("responsible")}
            className="form-control"
            id="validationCustom01"
            placeholder="Responsible"
          /> */}
          <p>{errors.Responsible?.message}</p>
        </div>
      </div>
      <div className="form-row checkbox-checklist">
        <div className="col-md-6 mb-3">
          <span>
            Add your guest
            <Link to="/guestslist" className="add-guests">
              <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
            </Link>
          </span>
        </div>
        <div className="col-md-4 mb-3">
          <input
            className="form-check-input"
            {...register("checked")} //eslint-disable-line
            type="checkbox"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            You did it
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {newItemchecklist.id ? "Edite Item" : "Create Item"}
      </button>
      <div className="form-row form-bottom" />
    </form>
  );
}
export default Form;
