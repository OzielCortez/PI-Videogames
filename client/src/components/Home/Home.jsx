import React, { useEffect, useState, useRef } from "react";
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

function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const currentPage = useSelector((state) => state.currentPage);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual del carrusel

  const videogamesPerPage = 15;
  const lastIndex = currentPage * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;

  const showGames = videogames.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(videogames?.length / videogamesPerPage);

  const nameIndex = firstIndex + currentIndex;

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === showGames.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? showGames.length - 1 : prevIndex - 1
    );
  };

  // Función para mover automáticamente el carrusel para que la card activa esté en el centro de la vista
  const autoScrollToActiveCard = () => {
    const activeSlide = document.querySelector(`.${styles.active}`);
    if (activeSlide) {
      activeSlide.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  useEffect(() => {
    autoScrollToActiveCard();
  }, [currentIndex]);

  return (
    <div className={styles.background}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-...+QfHtkGdrwNIVln+0hbh6MjriuAwggHRKlY2.."
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />

      <section className={styles.top_row}>
        <OrderVideogames />
        <FilterGenre />
        <FilterApi />
      </section>

      <main className={styles.main}>
        <div>
          <p>{`${firstIndex + 1} - ${lastIndex} of ${
            videogames?.length
          } videogames`}</p>

          <div className={styles.moving_text_container}>
            <h2 className={styles.moving_text}>
              {videogames[nameIndex]?.name}
            </h2>
          </div>
        </div>
        <div
          className={`${styles.body_videogames} ${styles.carouselcontainer}`}
        >
          {showGames.map((videogame, index) => (
            <div
              key={videogame.id}
              className={`${styles.slide} ${
                index === currentIndex ? styles.active : ""
              }`}
              ref={carouselRef}
            >
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
            </div>
          ))}
        </div>
        {/* <p>{videogames[nameIndex]?.genres}</p> */}
        <div className={styles.buttonContainer}>
          <SearchBar />
          <button className={styles.carouselButton} onClick={prevSlide}>
            <i className="fas fa-arrow-left" />
          </button>
          <button className={styles.carouselButton} onClick={nextSlide}>
            <i className="fas fa-arrow-right" />
          </button>
          <Link to="/videogames">
            <button className={styles.createButton}>
              <i className="fas fa-plus" />
            </button>
          </Link>
          <Link to="/">
            <button className={styles.homeButton}>
              <i className="fas fa-home" />
            </button>
          </Link>
        </div>

        {/* </div> */}
      </main>
      <hr className={styles.customhr} />

      <section className={styles.pagination}>
        <Pagination totalPages={totalPages} />
      </section>
    </div>
  );
}
export default Home;
