import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
// import Stack from "react-bootstrap/Stack";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Items from "@components/items/ItemsCopyForRegistrationPage";

const schema = Joi.object({
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
});

let backendURL =
  process.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com/";
function Login() {
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
  const navigate = useNavigate();

  const onSubmit = (data, e) => {
    // console.log(data);
    axios
      .post(`${backendURL}/checkCredentials`, {
        email: data.email,
        password: data.password,
      })
      .then((respons) => {
        localStorage.setItem("token", respons.data.token);
        const route = respons.data.role === "admin" ? "/admin" : "/";
        navigate(route);

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
      <h1 className="mt-5 mb-5 fw-bold">Login !</h1>
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col lg="8">
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
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                login
              </Button>
              <Link to="/register">
                <Button variant="primary" type="submit">
                  Make An Account
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="mb-5">
        <h1 className="mt-5 mb-5 fw-bold">Deine nächsten Schritte</h1>
        <Items />
      </div>
    </>
  );
}

export default Login;
