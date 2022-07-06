/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import "./Form.css";

const schema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(255)
    .case("lower")
    .required("title is required")
    .messages({
      "string.base": `title should be a type of 'text'`,
      "string.min": `title should have at least 3 characters`,
      "string.max": `title should have less than 255 characters`,
      "string.empty": "title can't be empty",
      "string.required": `title is a required field`,
    }),
  mobile: Joi.string().trim().required().messages({
    "string.base": `"" mobile should be a type of 'number'`,
    "string.empty": `"" mobile cannot be an empty field`,
    // "string.base.patern": `"" 10 digital numbers`,
    "any.required": `"" mobile is requireed`,
  }),
  /* .trim() */
  /* .regex(/^[6-9]\d{9}$/) */

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required("email is required"),
  price: Joi.number().precision(2).required("price is required"),
});

function Form({ editProvider, providerList }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  useEffect(() => {
    if (editProvider.id) {
      setValue("title", editProvider.title);
      setValue("mobile", editProvider.mobile);
      setValue("email", editProvider.email);
      setValue("price", editProvider.price);
    }
  }, [editProvider]); //eslint-disable-line
  const onSubmit = (data, e) => {
    /* console.log("data:", data); */
    const requestData = editProvider.id ? axios.put : axios.post;
    requestData("http://localhost:5000/provider", {
      title: data.title,
      mobile: data.mobile,
      email: data.email,
      price: data.price,
      id: editProvider.id,
    })
      .then(() => {
        providerList();
        e.target.reset();
        editProvider.id = null; //eslint-disable-line
      })
      .catch((err) => {
        if (err) {
          alert(err.response.data.message); //eslint-disable-line
        }
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">Title</label>
          <input
            {...register("title")} // eslint-disable-line
            className="form-control"
            id="validationCustom01"
            placeholder="Name Provider"
          />
          <p>{errors.title?.message}</p>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom02">Mobile</label>
          <input
            {...register("mobile")} // eslint-disable-line
            className="form-control"
            id="validationCustom02"
            placeholder="Phone Number"
          />
          <p>{errors.mobile?.message}</p>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom03">Email</label>
          <input
            {...register("email")} // eslint-disable-line
            className="form-control"
            id="inputEmail3"
            placeholder="Email"
          />
          <p>{errors.email?.message}</p>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom04">Price</label>
          <input
            {...register("price")} // eslint-disable-line
            className="form-control"
            id="inputPrice4"
            placeholder="Price"
          />
          <p>{errors.price?.message}</p>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {editProvider.id ? "Edite Provider" : "Create Provider"}
      </button>
    </form>
  );
}
export default Form;
