import { useDispatch, useSelector } from "react-redux";
import { filterDbApi, getVideogames } from "../../redux/actions";
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
    <div>
      <select onChange={(e) => handleFilter(e)} defaultValue="">
        <option value="All">All</option>
        <option value="Api">Api</option>
        <option value="Db">Database</option>
      </select>
    </div>
  );
};

export default FilterApi;
