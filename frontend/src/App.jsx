import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "@pages/Home";
import Navbar from "@components/nav/Navbar";
import Footer from "@components/footer/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
