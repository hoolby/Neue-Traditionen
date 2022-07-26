/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Items from "@components/items/ItemsCopyForRegistrationPage";
import Button from "react-bootstrap/Button";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
      <div className="register">
        <h1 className="mt-5 mb-5 fw-bold">Das hat geklappt!</h1>
        <Container fluid="md">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="mb-3">
              {/*   <Stack gap={3}> */}
              {/*    <Form.Group controlId="formFirstName"> */}
              <input
                required
                type="firstName"
                placeholder="Vorname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/*    <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback> */}
              {/*   </Form.Group> */}

              {/*    <Form.Group controlId="formEmail"> */}
              <input
                type="formEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
              {/*     <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback> */}
              {/*   </Form.Group> */}

              {/*    <Form.Group controlId="formPassword"> */}
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              {/*  <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback> */}
              {/*       </Form.Group> */}

              {/*               <div>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label={<p>
                      Newsletter
                      <br />
                      Ja, ich möchte persönliche Trost-Inspiration 1x
                      monatlich in meinem Postfach
                    </p>}
                    onChange={() => setConsentNewsletter(!consentNewsletter)} />
                </Form.Group>
              </div> */}

              <Button
                variant="secondary"
                className="mt-3"
                onClick={register}
                type="none"
              >
                Speichern & Einloggen
              </Button>
              <Button
                variant="secondary"
                className="mt-3"
                onClick={signInWithGoogle}
                type="none"
              >
                Register with Google
              </Button>
              <div>
                Already have an account?<Link to="/login">Login</Link> now.
              </div>
              {/*  </Stack> */}
            </div>
          </div>
        </Container>
      </div>
      <div className="mb-5">
        <h1 className="mt-5 mb-5 fw-bold">Deine nächsten Schritte</h1>
        <Items />
      </div>
    </>
  );
}
export default Register;
