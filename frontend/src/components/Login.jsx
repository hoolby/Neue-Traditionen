import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";

// eslint-disable-next-line
function Login() {
  const [validated, setValidated] = React.useState(false); // Sets whether or not the UI will show the validity of user inputs

  const [userMail, setUserMail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [postSubmitMessage, setPostSubmitMessage] = React.useState(
    "After submission, a message can be shown here."
  );

  // HANDLING SUBMISSION
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // Checking if all required fields have been completed
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      // Now we set the UI to show the what has been validated / which inputs need to be changed
      setValidated(true);
    } else {
      // Submitting the data
      event.preventDefault();
      axios
        .post("/api/login/", {
          userMail,
          password,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 204) {
            alert("You have successfully logged in.");
            // redirect!!
          } else {
            alert(
              `An error occured while submitting your data. Please try again later. HTTP code ${res.status}, ${res.statusText}`
            );
          }
        });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <h1 className="mt-5 mb-5 fw-bold">Login</h1>
      <Container fluid="md">
        {/* TEXT, INPUT FIELDS, CHECKBOXES, SUBMIT BUTTON */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* REACT-BOOTSTRAP COMPONENTS */}
          <Form
            className="mb-3"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {/* Stack is just for making the layout easier (similar to flexbox) */}
            <Stack gap={3}>
              {/* E-MAIL */}
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="formEmail"
                  placeholder="Deine E-Mail-Adresse"
                  required
                  value={userMail}
                  onChange={(event) => setUserMail(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group controlId="formPassword">
                <Form.Control
                  required
                  type="password"
                  placeholder="*Passwort"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback>
              </Form.Group>
            </Stack>
            <Button variant="secondary" type="submit" className="mt-3">
              Einloggen
            </Button>
            {postSubmitMessage ? (
              <p className="mt-3">{postSubmitMessage}</p>
            ) : null}
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
