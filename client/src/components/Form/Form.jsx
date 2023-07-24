import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Form/Form.module.css";
import { useState } from "react";
import { createVideogame, getGenres, getPlatforms } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    image: "",
    launchDate: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    launchDate: "",
    rating: "",
    genres: "",
    platforms: "",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    if (genres) dispatch(getGenres());
    if (platforms) dispatch(getPlatforms());
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
      dispatch(
        createVideogame({
          ...videogame,
          genres: [...selectedGenres],
          platforms: [...selectedPlatforms],
        })
      );
      setVideogame({
        name: "",
        description: "",
        image: "",
        launchDate: "",
        rating: 0,
      });
      setSelectedGenres([]);
      setSelectedPlatforms([]);
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

  const handleSelectedPlatforms = async (event) => {
    let platformsId = event.target.value;
    if (event.target.checked) {
      setSelectedPlatforms([...selectedPlatforms, parseInt(platformsId)]);
      setVideogame({ ...videogame, platforms: selectedPlatforms });
      setErrors(
        validate({
          ...videogame,
          platforms: [...videogame.platforms, event.target.value],
        })
      );
    } else {
      //Cuando se deseleccionan los checkboxs, estos actualizan
      setSelectedPlatforms(
        selectedPlatforms.filter((id) => id !== parseInt(platformsId))
      );
      setErrors(
        validate(
          {
            ...videogame,
            platforms: videogame.platforms.filter(
              (vg) => vg !== event.target.value
            ),
          },
          [...platforms]
        )
      );
    }
  };

  return (
    <div className={styles.fondo}>
      <form action="" className={styles.background}>
        <div className={styles.formGroup}>
          <label htmlFor="">Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Nombre de videojuego..."
            value={videogame.name}
            onChange={handleChange}
          />
          {errors.name ? <span>{errors.name}</span> : <span></span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Description: </label>
          <input
            type="text"
            name="description"
            placeholder="Breve descripción"
            value={videogame.description}
            onChange={handleChange}
          />

          {errors.description ? (
            <span>{errors.description}</span>
          ) : (
            <span></span>
          )}
        </div>
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
        <div class={styles.checkboxContainer}>
          <div class={styles.column}>
            <h4>Genres:</h4>
            {errors.genres ? <span>{errors.genres}</span> : <span></span>}
            {genres?.map((genre) => {
              return (
                <label key={genre.id} className={styles.checkboxLabel}>
                  {genre.name}
                  <input
                    type="checkbox"
                    value={genre.id}
                    id={genre.id}
                    onChange={handleSelectedGenres}
                    checked={selectedGenres.includes(genre.id)}
                  />
                </label>
              );
            })}
          </div>

          <div class={styles.column}>
            <h4>Platforms:</h4>
            {errors.platforms ? <span>{errors.platforms}</span> : <span></span>}
            {platforms?.map((platform) => {
              return (
                <label key={platform.id} className={styles.checkboxLabel}>
                  {platform.name}
                  <input
                    type="checkbox"
                    value={platform.id}
                    id={platform.id}
                    onChange={handleSelectedPlatforms}
                    checked={selectedPlatforms.includes(platform.id)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <button type="button" onClick={handleSubmit} className={styles.button}>
          Create
        </button>
        <Link to="/home">
          <button className={styles.button}>go home</button>
        </Link>
      </form>
    </div>
  );
}
export default Form;
