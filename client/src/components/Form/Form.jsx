import React, { useEffect } from "react";
import styles from "../Form/Form.module.css";
import { useState } from "react";
import { createVideogame, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    launchDate: "",
    rating: 0,
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    launchDate: "",
    rating: "",
    genres: "",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (genres) dispatch(getGenres());
  }, [dispatch]);

  const handleChange = (event) => {
    setVideogame({
      ...videogame,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({ ...videogame, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Si hago con !errors siempre será verdadero si devuelve {}
    if (Object.keys(errors).length === 0) {
      dispatch(createVideogame({ ...videogame, genres: [...selectedGenres] }));
      setVideogame({
        name: "",
        description: "",
        platforms: "",
        image: "",
        launchDate: "",
        rating: 0,
      });
      setSelectedGenres([]);
      alert("Se ha creado con exito");
    } else {
      alert("Cumplir con los requisitos antes de crear un videojuego");
    }
  };

  const handleSelectedGenres = async (event) => {
    let genreId = event.target.value;
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, parseInt(genreId)]);
      setVideogame({ ...videogame, genres: selectedGenres });
      setErrors(
        validate({
          ...videogame,
          genres: [...videogame.genres, event.target.value],
        })
      );
    } else {
      //Cuando se deseleccionan los checkboxs, estos actualizan
      setSelectedGenres(
        selectedGenres.filter((id) => id !== parseInt(genreId))
      );
      setErrors(
        validate(
          {
            ...videogame,
            genres: videogame.genres.filter((vg) => vg !== event.target.value),
          },
          [...genres]
        )
      );
    }
  };
  return (
    <form action="">
      <label htmlFor="">Name: </label>
      <input
        type="text"
        name="name"
        placeholder="Nombre de videojuego..."
        value={videogame.name}
        onChange={handleChange}
      />
      {errors.name ? <span>{errors.name}</span> : <span></span>}

      <label htmlFor="">Description: </label>
      <input
        type="text"
        name="description"
        placeholder="Breve descripción"
        value={videogame.description}
        onChange={handleChange}
      />
      {errors.description ? <span>{errors.description}</span> : <span></span>}

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
      {errors.image ? <span>{errors.image}</span> : <span></span>}

      <label htmlFor="">Launch date: </label>
      <input
        type="text"
        name="launchDate"
        placeholder="Fecha de lanzamiento"
        value={videogame.launchDate}
        onChange={handleChange}
      />
      {errors.launchDate ? <span>{errors.launchDate}</span> : <span></span>}

      <label htmlFor="">Rating: </label>
      <input
        type="text"
        name="rating"
        placeholder="Enter a rating"
        value={videogame.rating}
        onChange={handleChange}
      />
      {errors.rating ? <span>{errors.rating}</span> : <span></span>}
      <hr />
      <label>Genres: </label>
      {errors.genres ? <span>{errors.genres}</span> : <span></span>}
      {genres?.map((genre) => {
        return (
          <p key={genre.id}>
            <label>{genre.name}</label>
            <input
              type="checkbox"
              value={genre.id}
              id={genre.id}
              onChange={handleSelectedGenres}
              checked={selectedGenres.includes(genre.id)}
            />
          </p>
        );
      })}
      <button type="button" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
}
export default Form;
