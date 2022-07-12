import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Items from "@components/items/ItemsCopyForRegistrationPage";

const schema = Joi.object({
  username: Joi.string().min(3).max(255).required().messages({
    "string.base": `username should be a type of 'text'`,
    "string.min": `username should have at least 3 characters`,
    "string.max": `username should have less than 255 characters`,
    "string.empty": "username can't be empty",
    "string.required": `username is a required field`,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": `email is a required field`,
      "string.empty": "email can't be empty",
      "string.required": `email is a required field`,
    }),
  password: Joi.string().min(3).max(15).required().messages({
    "string.base": `password should be a type of 'text'`,
    "string.min": `password should have at least 3 characters`,
    "string.max": `password should have less than 255 characters`,
    "string.empty": "password can't be empty",
    "string.required": `password is a required field`,
  }), // .regex(/^[a-zA-Z0-9]{3,30}$/)
  cppassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { "any.only": "Password does not match" } }),
  consentNewsletter: Joi.boolean(),
  consentForConnecting: Joi.boolean(),
});

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: joiResolver(schema) });
  const [handelError, setHandelError] = useState("");
  const [show, setShow] = useState(false);
  const [varient, setVarient] = useState("");

  const onSubmit = (data, e) => {
    console.log(data);
    axios
      .post("http://localhost:5000/register", {
        email: data.email,
        username: data.username,
        password: data.password,
        consentNewsletter: data.consentNewsletter,
        consentForConnecting: data.consentForConnecting,
        role: "client",
      })
      .then((respons) => {
        console.log(respons);
        setHandelError("it was successfull");
        setShow(true);
        setVarient("success");
        e.target.reset();
      })
      .catch((err) => {
        setHandelError(err.response.data.message);
        setShow(true);
        setVarient("danger");
      });
  };
  return (
    <>
      <h1 className="mt-5 mb-5 fw-bold">Make an Account</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFirstname">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("cppassword")}
          />
          {errors.cppassword && (
            <p className="error-message">{errors.cppassword.message}</p>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            {...register("consentNewsletter")}
            label={
              <p>
                Newsletter
                <br />
                Ja, ich möchte persönliche Trost-Inspiration 1x monatlich in
                meinem Postfach
              </p>
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            {...register("consentForConnecting")}
            label={
              <p>
                Matching
                <br />
                Ja, ich möchte mit anderen Menschen aus der Community verknüpft
                werden
              </p>
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      {/* ****************************************************************
       BOTTOM SECTION
      ***************************************************************** */}
      <div className="mb-5">
        <h1 className="mt-5 mb-5 fw-bold">Deine nächsten Schritte</h1>
        <Items />
        {/* ALTERNATIVELY: USE REACT BOOTSTRAP STACK */}
        {/* <Stack direction="horizontal">
          <Card>Card component from Homepage</Card>
          <Card>Card component from Homepage</Card>
          <Card>Card component from Homepage</Card>
        </Stack> */}
      </div>
    </>
  );
}

export default Register;
