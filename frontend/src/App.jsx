/* eslint-disable import/no-unresolved */
// Pages and components
import BlogDetails from "@components/blogs/BlogDetails";
import ContactAsked from "@components/ContactAsked";
import ContactForm from "@components/boxForm";
import Footer from "@components/footer/Footer";
import Navbar from "@components/nav/Navbar";
import Providers from "@components/providers/Providers";
import Register from "@components/Register";
import Login from "@components/Login";
import FunnelMap from "@components/Funnel/FunnelMap";

import AdminPage from "@pages/adminpage/Adminpage";
import Home from "@pages/home/Home";

// Modules
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CheckList from "@components/checkList/CheckList";
import InviteGuests from "@components/inviteGuests/InviteGuests";
import HomeBlogs from "./pages/HomeBlogs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

library.add(fas, fab);

function App() {
  const userMail = "testmail@testmail.com";
  const userId = 1; // for Register Component - to be replaced by user email on entering the registration page from custom link
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register userMail={userMail} userId={userId} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/checklist" element={<CheckList />} />
          <Route path="/guestslist" element={<InviteGuests />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/contactform" element={<ContactForm />} />
          <Route path="/invitation" element={<ContactAsked />} />
          <Route path="/Funeral" element={<FunnelMap />} />
          <Route path="/blogs" element={<HomeBlogs />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
