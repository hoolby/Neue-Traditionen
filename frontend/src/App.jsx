import React from "react";
import Register from "@components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "@pages/Home";
import Navbar from "@components/nav/Navbar";
import Footer from "@components/footer/Footer";
import Create from "@components/blogs/create";
import BlogDetails from "./components/blogs/BlogDetails";

import "./App.css";
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
          <Route path="/create" element={<Create />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
