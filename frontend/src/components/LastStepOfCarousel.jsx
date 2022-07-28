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
function LastStepOfCarousel({
  selection,
  setUserMail,
  setShowRegisterComponent,
}) {
  // PROPS: ???
  const [validated, setValidated] = React.useState(false); // Sets whether or not the UI will show the validity of user inputs

  const [mail, setMail] = React.useState(null);
  const [consentTOS, setConsentTOS] = React.useState(false);
  const [postSubmitMessage, setPostSubmitMessage] = React.useState(null);

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
      setUserMail(mail);
      setShowRegisterComponent(true);
      // axios
      //   .post(`/api/user/`, {
      //     mail,
      //     selection,
      //   })
      //   .then((res) => {
      //     if (res.status === 200 || res.status === 204) {
      //       setPostSubmitMessage("You have successfully created your account.");
      //       setUserMail(mail);
      //       setShowRegisterComponent(true);
      //     }
      //   })
      //   .catch((err) => {
      //     setPostSubmitMessage(
      //       `An error occured while submitting your data. Please try again. ${err}`
      //     );
      //     // TAKE THESE NEXT TWO LINES OUT!!    MUST NOT SWITCH TO REGISTER BEFORE mail AND selection  HAVE BEEN STORED IN DB!!!
      //     setUserMail(mail);
      //     setShowRegisterComponent(true);
      //   });
    }
  };

  return (
    <>
      <h1 className="mt-5 mb-5 fw-bold">
        Fast Fertig!
        <br />
        Speichere deinen Plan und erhalte die Kostenübersicht als PDF
      </h1>
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
                Wir benötigen deine E-Mail-Adresse, um dir deine Planung
                zusenden zu können.
              </p>

              {/* Email field  */}

              <Form.Group controlId="formMail">
                <Form.Control
                  required
                  type="mail"
                  placeholder="E-Mail-Adresse eingeben"
                  value={mail}
                  onChange={(event) => setMail(event.target.value)}
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
                    required
                    type="checkbox"
                    label="Ja, ich stimme den AGBs zu"
                    feedback="Sie müssen den AGBs zustimmen, um sich registrieren zu können."
                    feedbackType="invalid"
                    onChange={() => setConsentTOS(!consentTOS)}
                  />
                </Form.Group>
              </div>
            </Stack>
            <Button variant="secondary" type="submit" className="mt-3">
              Plan speichern
            </Button>
          </Form>
        </div>
      </Container>
      <p className="mt-5">
        Bereits registriert? Hier kannst du dich <a href="/login">einloggen</a>.
      </p>
      <h2>{postSubmitMessage}</h2>
    </>
  );
}

export default LastStepOfCarousel;
