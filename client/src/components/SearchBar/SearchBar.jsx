import { useDispatch, useSelector } from "react-redux";
import { getVideogameByName } from "../../redux/actions";
import { useState } from "react";
import VideogameCard from "../VideogameCard/VideogameCard";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSearch = () => {
    dispatch(getVideogameByName(name));
  };
  const response = useSelector((state) => state.searchResults);
  console.log(response);
  return (
    <div>
      <input type="text" onChange={handleChange} value={name} />
      <button onClick={handleSearch}>Search</button>
      {response.map((videogame) => {
        return (
          <VideogameCard
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            image={videogame.image || videogame.background_image}
            genres={videogame.genres || videogame.genres.name}
          />
        );
      })}
    </div>
  );
};

export default SearchBar;
