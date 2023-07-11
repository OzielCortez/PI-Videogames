import React from "react";
import styles from "../Form/Form.module.css";
import axios from "axios";
import { useState } from "react";
import { createVideogame } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Form() {
  const dispatch = useDispatch();
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    launchDate: "",
    rating: 0,
    genres: 0,
  });
  const handleChange = (event) => {
    setVideogame({ ...videogame, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(createVideogame(videogame));
  };
  return (
    <form action="">
      <label htmlFor="">Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Nombre de videojuego..."
        value={videogame.name}
        onChange={handleChange}
      />
      {console.log(videogame.name)}
      <label htmlFor="">Description:</label>
      <input
        type="text"
        name="description"
        placeholder="Breve descripción"
        value={videogame.description}
        onChange={handleChange}
      />
      <label htmlFor="">Platforms: </label>
      <input
        type="text"
        name="platforms"
        placeholder="Disponibilidad en plataformas"
        value={videogame.platforms}
        onChange={handleChange}
      />
      <label htmlFor="">Image: </label>
      <input
        type="url"
        name="image"
        placeholder="Enter url"
        value={videogame.image}
        onChange={handleChange}
      />
      <label htmlFor="">LaunchDate: </label>
      <input
        type="text"
        name="launchDate"
        placeholder="Fecha de lanzamiento"
        value={videogame.launchDate}
        onChange={handleChange}
      />
      <label htmlFor="">Rating: </label>
      <input
        type="number"
        min={1}
        max={100}
        name="rating"
        placeholder="Enter a rating"
        value={videogame.rating}
        onChange={handleChange}
      />
      <label htmlFor="">Genres: </label>
      <input
        type="text"
        name="genres"
        placeholder="Enter a videogame gender..."
        value={videogame.genres}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}
export default Form;
