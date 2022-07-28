import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./CheckList.css";

function CheckListItem({ list }) {
  return (
    <section className="table-container">
      <div className="table table-striped table-bordered table-responsive-lg">
        <div>
          <div>
            <strong className="titleList">
              Checkliste Bestattung & Trauerfeier
            </strong>
            <br />
            <br />
            <p className="subTitle">
              Mit dieser Liste möchten wir dir einen Überblick geben, welche
              Schritte im Trauerfall unternommen werden können. Sie soll dir zur
              Orientierung dienen und dich in der Organisation unterstützen.
            </p>
          </div>
        </div>
      </div>
      <div>
        {list.map((item) => (
          <CardGroup key={item.id} className="listGroup">
            <Card className="listCard">
              <Card.Title className="listTitle">{item.head}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card>
          </CardGroup>
        ))}
      </div>
    </section>
  );
}

export default CheckListItem;
