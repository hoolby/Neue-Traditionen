/* eslint-disable import/no-unresolved */
import BlogDetails from "@components/blogs/BlogDetails";
import ContactAsked from "@components/ContactAsked";
import ContactForm from "@components/boxForm";
import Footer from "@components/footer/Footer";
import Navbar from "@components/nav/Navbar";
import Providers from "@components/providers/Providers";
import Register from "@components/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AdminPage from "@pages/adminpage/Adminpage";
import Home from "@pages/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

library.add(fas, fab);

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
          <Route path="/contactform" element={<ContactForm />} />
          <Route path="/invitation" element={<ContactAsked />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
