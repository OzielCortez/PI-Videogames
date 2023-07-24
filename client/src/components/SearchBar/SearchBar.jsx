import { useDispatch, useSelector } from "react-redux";
import { getVideogameByName } from "../../redux/actions";
import { useState } from "react";
import VideogameCard from "../VideogameCard/VideogameCard";
import styles from "../SearchBar/SearchBar.module.css";
const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSearch = () => {
    dispatch(getVideogameByName(name));
    setName("");
  };
  const response = useSelector((state) => state.videogames);

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={handleChange}
        value={name}
        className={styles.bar}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
      {/* {response.map((videogame) => {
        return (
          <VideogameCard
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            image={videogame.image || videogame.background_image}
            genres={videogame.genres || videogame.genres.name}
          />
        );
      })} */}
    </div>
  );
};

export default SearchBar;
