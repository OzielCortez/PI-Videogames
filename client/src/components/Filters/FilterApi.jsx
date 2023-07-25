import { useDispatch, useSelector } from "react-redux";
import { filterDbApi, getVideogames } from "../../redux/actions";
import styles from "../Filters/FilterApi.module.css";
const FilterApi = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const handleFilter = (event) => {
    event.preventDefault();
    /* if (event.target.value === "All") dispatch(getVideogames()); */
    if (!videogames) dispatch(getVideogames());
    else dispatch(filterDbApi(event.target.value));
  };
  return (
    <div className={styles.filterApi}>
      <select
        onChange={(e) => handleFilter(e)}
        defaultValue=""
        className={styles.select}
      >
        <option selected hidden>
          Filter by
        </option>
        <option value="All">All</option>
        <option value="Api">Api</option>
        <option value="Db">Database</option>
      </select>
    </div>
  );
};

export default FilterApi;
