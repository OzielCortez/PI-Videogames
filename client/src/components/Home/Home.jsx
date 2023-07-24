import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";
import VideogameCard from "../VideogameCard/VideogameCard";
import OrderVideogames from "../OrderVideogames/OrderVideogames";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import FilterGenre from "../Filters/FilterGenre";
import FilterApi from "../Filters/FilterApi";
import Pagination from "../Pagination/Pagination";
import background from "C:/Users/oziel/Desktop/PI-Videogames-main/client/src/assets/DetailPage1.png";

function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const currentPage = useSelector((state) => state.currentPage);
  /*   const [isSearching, setIsSearching] = useState(false); */

  const videogamesPerPage = 15;
  const lastIndex = currentPage * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;

  const showGames = videogames.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(videogames?.length / videogamesPerPage);

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  return (
    <div className={styles.background}>
      {/* {<img src={background} alt="backgroundHome" className={styles.img} />} */}
      <header className={styles.columns}>
        <div className={styles.left_column}>
          <FilterGenre />
          <FilterApi />
          <Link to="/videogames">
            <button>Create videogame</button>
          </Link>
        </div>
        {/* <div className={styles.center_column}>
          <h1>My videogames</h1>
        </div> */}
      </header>
      <main className={styles.main}>
        <div className={styles.top_bar}>
          <div className={styles.top_left}>
            <p>{`${firstIndex + 1} - ${lastIndex} of ${videogames?.length}`}</p>
            <OrderVideogames />
          </div>
          <div className={styles.top_right}>
            <SearchBar />
          </div>
        </div>
        {/* Cards */}
        <div className={styles.body_videogames}>
          {showGames.map((videogame) => {
            return (
              <VideogameCard
                key={videogame.id}
                id={videogame.id}
                name={videogame.name}
                image={
                  !videogame.image
                    ? videogame.background_image
                    : videogame.image
                }
                genres={videogame.genres}
              />
            );
          })}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footer_pagination}>
          <Pagination totalPages={totalPages} />
        </div>
      </footer>
    </div>
  );
}
export default Home;
