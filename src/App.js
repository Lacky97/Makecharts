import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState,useEffect } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import MyChart from "./components/MyChart";

function App() {

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", hideMenu);

    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <NavBar toggle={toggle} isOpen={isOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<MyChart />} />
      </Routes>
    </Router>
  );
}

export default App;
