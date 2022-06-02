import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "@pages/home/Home";
import Navbar from "@components/nav/Navbar";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Footer from "@components/footer/Footer";

import "./App.css";
library.add(fas, fab);
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
