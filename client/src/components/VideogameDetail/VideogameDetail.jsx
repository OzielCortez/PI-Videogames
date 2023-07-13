import React, { useEffect, useState } from "react";
import styles from "../VideogameDetail/VideogameDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function VideogameDetail() {
  const { id } = useParams();
  let genresToString = "";
  const videogames = useSelector((state) => state.videogames);
  const videogame = videogames.filter((vg) => vg.id === Number(id));
  console.log(videogame[0].platforms[0]);
  if (typeof videogame[0].genres[0] === "string")
    genresToString = videogame[0].genres.join(", ");
  else if (typeof videogame[0].genres === "object")
    genresToString = videogame[0].genres
      ? videogame[0].genres.map((genre) => genre.name).join(", ")
      : " ";

  return (
    <div>
      <p>Detail</p>
      <p>{`Name: ${videogame[0].name}`}</p>
      <p>{`Description: ${undefined ? videogame[0].description : ""}`}</p>
      <p>{`Platforms: ${videogame[0].platforms.join(", ")}`}</p>
      <p>{`Launch date: ${
        videogame[0].launchDate || videogame[0].releaseDate
      }`}</p>
      <p>{`Rating: ${videogame[0].rating}`}</p>
      <p>{`Genres: ${genresToString}`}</p>
      <img
        src={videogame[0].image}
        alt={videogame[0].name}
        className={styles.image}
      />
    </div>
  );
}
export default VideogameDetail;
