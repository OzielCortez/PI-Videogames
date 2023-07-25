import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import { filterByGenre } from "../../redux/actions";
import { useEffect } from "react";
import styles from "../Filters/FilterGenre.module.css";

const FilterGenre = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    if (genres) dispatch(getGenres());
  }, [dispatch]);

  const filterGen = (event) => {
    event.preventDefault();
    dispatch(filterByGenre(event.target.value));
  };
  return (
    <div className={styles.filterGenre}>
      <select
        onChange={(e) => filterGen(e)}
        defaultValue=""
        className={styles.select}
      >
        <option selected hidden>
          Filter by Genres
        </option>
        <option value="All">All</option>
        {genres?.map((genre) => {
          return (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterGenre;
