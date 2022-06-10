/* eslint-disable import/no-unresolved */
import React from "react";
import Register from "@components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "@pages/home/Home";
import AdminPage from "@pages/adminpage/Adminpage";
import Navbar from "@components/nav/Navbar";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Footer from "@components/footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "@components/providers/Providers";
import BlogDetails from "@components/blogs/BlogDetails";

import "./App.css";

library.add(fas, fab);
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
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
