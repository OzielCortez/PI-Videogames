import React, { useEffect } from "react";
import styles from "../Home/Home.module.css";
import VideogameCard from "../VideogameCard/VideogameCard";
import OrderVideogames from "../OrderVideogames/OrderVideogames";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import FilterGenre from "../Filters/FilterGenre";
import FilterApi from "../Filters/FilterApi";
import Pagination from "../Pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const currentPage = useSelector((state) => state.currentPage);

  const videogamesPerPage = 15;
  const lastIndex = currentPage * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;

  const showGames = videogames.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(videogames?.length / videogamesPerPage);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div>
      <p>Home page</p>
      <SearchBar />
      <OrderVideogames />
      <FilterGenre />
      <FilterApi />
      <h4>Lista de videojuegos</h4>

      {showGames.map((videogame) => {
        return (
          <VideogameCard
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            image={videogame.image}
            genres={videogame.genres}
          />
        );
      })}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
export default Home;
