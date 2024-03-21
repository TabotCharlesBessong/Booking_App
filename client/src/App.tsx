import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Login, Signup } from "./pages";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={"Hello Home"} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
