import style from "../VideogameCard/VideogameCard.module.css";
import { useState } from "react";

function Videogame({
  id,
  name,
  description,
  platforms,
  image,
  launchDate,
  rating,
  genres,
}) {
  return (
    <div>
      <h1>{id}</h1>
      <p>{name}</p>
      <p>{description}</p>
      <p>{platforms}</p>
      <p>{image}</p>
      <p>{launchDate}</p>
      <p>{rating}</p>
      {/* <p>{genres}</p> */}
    </div>
  );
}
export default Videogame;
