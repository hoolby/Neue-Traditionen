import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
// This will be overridden by Bootstrap (unless the property is not definded in Bootstrap)
import "./Register.css";

// eslint-disable-next-line
function Register({ userMail }) {
  function submitHandler(event) {
    event.PreventDefault();
  }

  return (
    <>
      <h1>Das hat geklappt!</h1>
      <p>
        Bitte bestätige noch fix deine E-Mail-Adresse in deinem Posteingang und
        vervollständige dein Profil.
      </p>
      {/* TEXT, INPUT FIELDS, CHECKBOXES, SUBMIT BUTTON */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* REACT-BOOTSTRAP COMPONENTS */}
        <Form className="mb-3">
          {/* Stack is just for making the layout easier (similar to flexbox) */}
          <Stack gap={2}>
            <Form.Group controlId="formEmail">
              <Form.Control
                variant
                type="email"
                placeholder={userMail}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Control type="firstName" placeholder="Vorname" />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Control type="lastName" placeholder="Nachname" />
            </Form.Group>
            {/* CHECKBOXES */}
            <Form.Check
              type="checkbox"
              label="Ja, ich möchte mit anderen Menschen aus der Community verknüpft werden"
            />
            <Form.Check
              type="checkbox"
              label="Ja, ich möchte persönliche Trost-Inspiration 1x monatlich in meinem Postfach"
            />
            <Form.Check type="checkbox" label="Ja, ich stimme den AGBs zu" />
          </Stack>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => submitHandler}
          >
            Speichern & Einloggen
          </Button>
        </Form>
      </div>
      {/* BOTTOM SECTION */}
      <div>
        <h1>Deine nächsten Schritte</h1>
        <Stack direction="horizontal">
          <Card>Card component from Homepage</Card>
          <Card>Card component from Homepage</Card>
          <Card>Card component from Homepage</Card>
        </Stack>
      </div>
    </>
  );
}

export default Register;
