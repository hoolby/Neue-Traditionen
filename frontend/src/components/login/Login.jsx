/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import "./Login.css";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="d-flex flex-column justify-content-center">
      <h1 className="mt-5 mb-5 fw-bold">Login</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="mb-3">
          <Stack gap={3}>
            <div controlId="formEmail">
              <input
                type="formEmail"
                placeholder="Deine E-Mail-Adresse"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div type="invalid">Feld ist erforderlich.</div>
            </div>

            <div controlId="formPassword">
              <input
                required
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div type="invalid">Feld ist erforderlich.</div>
            </div>
          </Stack>

          <Button
            variant="secondary"
            type="none"
            className="mt-3 bgap"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Einloggen
          </Button>
          <Button
            variant="secondary"
            type="none"
            className="mt-3 bgap"
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
