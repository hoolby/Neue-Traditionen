import React from "react";
import Register from "@components/Register";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const userMail = "testmail@testmail.com";
  return (
    <div className="App">
      <Register userMail={userMail} />
    </div>
  );
}

export default App;
