/* eslint-disable import/no-unresolved */
import BlogDetails from "@components/blogs/BlogDetails";
import Footer from "@components/footer/Footer";
import Navbar from "@components/nav/Navbar";
import Providers from "@components/providers/Providers";
import Login from "@components/login/Login";
import Register from "@components/register/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AdminPage from "@pages/adminpage/Adminpage";
import Home from "@pages/home/Home";
import CheckList from "@components/checkList/CheckList";
import InviteGuests from "@components/inviteGuests/InviteGuests";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

library.add(fas, fab);

library.add(fas, fab);
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkCredentials" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/checklist" element={<CheckList />} />
          <Route path="/guestslist" element={<InviteGuests />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
