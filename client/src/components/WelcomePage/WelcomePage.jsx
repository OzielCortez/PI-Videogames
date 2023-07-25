import React from "react";
import styles from "../WelcomePage/WelcomePage.module.css";
import { Link } from "react-router-dom";
import marioGif from "C:/Users/oziel/Desktop/PI-Videogames-main/client/src/assets/2d-mario-running.gif";
function WelcomePage(props) {
  return (
    <div className={styles.container}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-...+QfHtkGdrwNIVln+0hbh6MjriuAwggHRKlY2.."
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <p className={styles.content}>
        <Link to={"/home"}>
          <button>
            <i
              className={`fas fa-house-user ${styles.iconContainer} ${styles.pulse}`}
            />
          </button>
        </Link>

        <h1>Bienvenido</h1>
      </p>
      <img src={marioGif} alt="Mario corriendo" className={styles.gif} />
    </div>
  );
}

export default WelcomePage;
