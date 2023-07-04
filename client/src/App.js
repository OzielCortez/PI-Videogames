import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail.jsx";

function App() {
  return (
    <>
      <h1>Bienvenida</h1>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<VideogameDetail />} />
      </Routes>
    </>
  );
}

export default App;
