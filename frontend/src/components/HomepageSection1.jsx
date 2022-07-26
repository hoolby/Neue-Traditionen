import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "@components/HomepageSection1.css";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import Dropdown from "react-bootstrap/Dropdown";

function HomepageSection1() {
  const navigate = useNavigate();
  return (
    <div className="homepagesection1">
      <div className="container">
        <h1 className="mt-5">
          <strong>
            Jetzt Beerdigung planen
            <br />
          </strong>
          <small>und Vorschläge für </small>
          <strong>
            <br />
            Anbieter in deiner Nähe erhalten
          </strong>
        </h1>
        <h4 className="mt-5">
          Wir sind dein unabhängiger Beerdigungsplaner und helfen dir, den
          Überblick zu behalten.
        </h4>

        <Form
          onSubmit={(e) => {
            navigate("carousel");
          }}
          // ; navigate(`/carousel#funeraltype=${value}`)
          className="mt-5 mb-5 d-flex justify-content-center"
        >
          <Button className="d-inline mr-0 kostenlosPlanen" type="submit">
            Kostenlos planen
          </Button>
          <div className="d-inline">
            {/* I TRIED TO ADD A LABEL ("Art der Bestattung"), BUT IT WAS ALWAYS TRICKY. MOST PROMISING OPTION: VERSION 1, <FloatingLabel> from React BS */}

            {/*   // LABEL VERSION 1
              <FloatingLabel
              controlId="typeOfFuneral"
              label="Art der Bestattung"
              //   className="mb-3 d-inline"
            > */}
            <Form.Select
              className="d-inline h-100"
              placeholder="Art der Bestattung"
              size="md"
              aria-label="Art der Bestattung auswählen"
            >
              {/* LABEL VERSION 2 <option>Art der Bestattung...</option> */}
              <option value="religious">
                Traditionell mit religiösen Elementen
              </option>
              <option value="non-religious">Eher nicht-religiös</option>
            </Form.Select>
            {/* </FloatingLabel> */}
          </div>
          {/* LABEL VERSION3 <Form.Text>Art der Bestattung</Form.Text> */}
        </Form>
      </div>
    </div>
  );
}

export default HomepageSection1;

/*   ERSTE IDEE:     DROPDOWN MENU
    <Dropdown as={ButtonGroup} autoClose="inside">
    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
    
        <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
        Traditionell mit religiösen Elementen
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Eher nicht-religiös</Dropdown.Item>
          </Dropdown.Menu>
        <Button variant="success">Kostenlos planen</Button>
      </Dropdown> */
