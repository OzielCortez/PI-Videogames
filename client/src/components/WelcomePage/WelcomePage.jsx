import React from "react";
import styles from "../WelcomePage/WelcomePage.module.css";
import { Link } from "react-router-dom";
import background from "C:/Users/oziel/Desktop/PI-Videogames-main/client/src/assets/DetailPage1.png";

function WelcomePage(props) {
  return (
    <div className={styles.container}>
      <img src={background} alt="LandingPage" />
      <p className={styles.content}>
        <h1>Bienvenido</h1>
        <Link to={"/home"}>
          <button>HomePage</button>
        </Link>
      </p>
    </div>
  );
}

export default WelcomePage;
