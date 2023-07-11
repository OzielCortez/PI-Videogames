import React, { useEffect } from "react";
import styles from "../Home/Home.module.css";
import VideogameCard from "../VideogameCard/VideogameCard";
import OrderVideogames from "../OrderVideogames/OrderVideogames";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import FilterGenre from "../Filters/FilterGenre";

function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    if (videogames) dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div>
      <p>Home page</p>
      <SearchBar />
      <OrderVideogames />
      <FilterGenre />
      <h4>Lista de videojuegos</h4>
      <h1>
        {videogames.map((videogame) => {
          return (
            <VideogameCard
              key={videogame.name}
              id={videogame.id}
              name={videogame.name}
              image={videogame.image}
              genres={videogame.genres}
            />
          );
        })}
      </h1>
    </div>
  );
}
export default Home;
