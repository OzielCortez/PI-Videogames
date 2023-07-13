import React from "react";
import styles from "../WelcomePage/WelcomePage.module.css";
import { Link } from "react-router-dom";

function WelcomePage(props) {
  return (
    <div>
      <h1>Esta es mi landing Page</h1>
      <h2>Bienvenido</h2>
      <Link to={"/home"}>
        <button>HomePage</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
