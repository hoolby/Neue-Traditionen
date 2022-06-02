import React from "react";
import Register from "@components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "@pages/home/Home";
import Navbar from "@components/nav/Navbar";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Footer from "@components/footer/Footer";

import "./App.css";
library.add(fas, fab);
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const userMail = "testmail@testmail.com";
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register userMail={userMail} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
