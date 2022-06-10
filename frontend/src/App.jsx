import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Register from "@components/Register";
import Home from "@pages/home/Home";
import AdminPage from "@pages/adminpage/Adminpage";
import Navbar from "@components/nav/Navbar";
import Footer from "@components/footer/Footer";
import Providers from "@components/providers/Providers";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fas, fab);

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const userMail = "testmail@testmail.com";
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register userMail={userMail} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/providers" element={<Providers />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
