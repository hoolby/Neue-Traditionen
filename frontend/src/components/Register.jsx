import React from "react";
import axios from "axios";
/* import Card from "react-bootstrap/Card"; */
import Container from "react-bootstrap/Container";
// eslint-disable-next-line import/no-unresolved
import Items from "@components/items/ItemsCopyForRegistrationPage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

// eslint-disable-next-line
function Register({ userMail, userId }) {
  // PROPS: userMail from the previous step in the sign-up process
  const [validated, setValidated] = React.useState(false); // Sets whether or not the UI will show the validity of user inputs

  const [firstName, setFirstName] = React.useState(null);
  // const [lastName, setLastName] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordRepeated, setPasswordRepeated] = React.useState(null);
  const [consentNewsletter, setConsentNewsletter] = React.useState(false);
  const [consentForConnecting, setConsentForConnecting] = React.useState(false);
  // const [consentTOS, setConsentTOS] = React.useState(false);

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
        .put(`/api/user/${userId}`, {
          firstName,
          // lastName,
          consentForConnecting,
          consentNewsletter,
          // consentTOS,
          password,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 204) {
            alert("You have successfully created your account.");
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
    <>
      <h1 className="mt-5 mb-5 fw-bold">Das hat geklappt!</h1>
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
              <p className="mb-5">
                Bitte bestätige noch fix deine E-Mail-Adresse in deinem
                Posteingang und vervollständige dein Profil.
              </p>

              {/* Email field (takes value from DB, no changes possible) */}
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="formEmail"
                  placeholder={userMail}
                  disabled
                />
              </Form.Group>
              {/* Input first name */}
              <Form.Group controlId="formFirstName">
                <Form.Control
                  required
                  type="firstName"
                  placeholder="Vorname"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback>
              </Form.Group>
              {/* LAST NAME */}
              {/* <Form.Group controlId="formLastName">
                <Form.Control
                  required
                  type="lastName"
                  placeholder="Nachname"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback>
              </Form.Group> */}
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
              {/* REPEAT PASSWORD */}
              <Form.Group controlId="formPasswordRepeated">
                <Form.Control
                  required
                  type="password"
                  placeholder="*Passwort wiederholen"
                  value={passwordRepeated}
                  onChange={(event) => setPasswordRepeated(event.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Feld ist erforderlich.
                </Form.Control.Feedback>
              </Form.Group>

              {/* ****************************************************************
               CHECKBOXES
               ***************************************************************** */}
              <div>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label={
                      <p>
                        Newsletter
                        <br />
                        Ja, ich möchte persönliche Trost-Inspiration 1x
                        monatlich in meinem Postfach
                      </p>
                    }
                    onChange={() => setConsentNewsletter(!consentNewsletter)}
                  />
                  <Form.Check
                    type="checkbox"
                    label={
                      <p>
                        Matching
                        <br />
                        Ja, ich möchte mit anderen Menschen aus der Community
                        verknüpft werden
                      </p>
                    }
                    onChange={() =>
                      setConsentForConnecting(!consentForConnecting)
                    }
                  />
                  {/* <Form.Check
                    required
                    type="checkbox"
                    label="Ja, ich stimme den AGBs zu"
                    feedback="Sie müssen den AGBs zustimmen, um sich registrieren zu können."
                    feedbackType="invalid"
                    onChange={() => setConsentTOS(!consentTOS)}
                  /> */}
                </Form.Group>
              </div>
            </Stack>
            <Button variant="secondary" type="submit" className="mt-3">
              Speichern & Einloggen
            </Button>
            <Button variant="secondary" type="submit" className="mt-3">
              Already registered?
              <a href="/login">Sign In</a>
            </Button>
          </Form>
        </div>
      </Container>

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
          // Import Card from Bootstrap !!
        </Stack> */}
      </div>
    </>
  );
}

export default Register;
