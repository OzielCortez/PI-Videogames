import React, { useEffect, useState } from "react";
import styles from "../VideogameDetail/VideogameDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function VideogameDetail() {
  const [videogame, setVideogame] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
      if (data.name) {
        setVideogame(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    return setVideogame({});
  }, [id]);
  const genresToString = videogame.genres
    ? videogame.genres.map((genre) => genre.name).join(", ")
    : " ";
  return (
    <div>
      <p>Detail</p>
      <p>{`nombre: ${videogame.name}`}</p>
      <p>{videogame.description}</p>
      <p>{videogame.platforms}</p>
      <p>{videogame.launchDate}</p>
      <p>{videogame.rating}</p>
      <p>{genresToString}</p>
      <img
        src={videogame.image}
        alt={videogame.name}
        className={styles.image}
      />
    </div>
  );
}
export default VideogameDetail;
