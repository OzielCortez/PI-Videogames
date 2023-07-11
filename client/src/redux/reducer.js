import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_VIDEOGAME_DETAILS,
  GET_GENRES,
  CREATE_VIDEOGAME,
  ORDER_ALL_VIDEOGAMES,
  FILTER_BY_GENRE,
  RESET_FILTER,
  FILTER_DBAPI,
  getVideogames,
} from "./actions";
const initialState = {
  videogames: [],
  genres: [],
  searchResults: [],
  selectedVideogame: [],
  videogamesBackup: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEOGAMES:
      return { ...state, videogames: payload, videogamesBackup: payload };
    case GET_VIDEOGAME_BY_NAME:
      return { ...state, searchResults: payload };
    case GET_VIDEOGAME_DETAILS:
      return { ...state, selectedVideogame: payload };
    case GET_GENRES:
      return { ...state, genres: payload };
    case CREATE_VIDEOGAME:
      return { ...state, videogames: [...state.videogames, payload] };
    case ORDER_ALL_VIDEOGAMES:
      const videogamesCopy = [...state.videogames];
      const orderVideogames = videogamesCopy.sort((a, b) => {
        if (payload === "A-Z") return a.name.localeCompare(b.name);
        else if (payload === "Z-A") return b.name.localeCompare(a.name);
        else if (payload === "ASC") return a.rating - b.rating;
        else if (payload === "DESC") return b.rating - a.rating;
      });
      return { ...state, videogames: orderVideogames };
    case FILTER_BY_GENRE:
      const copyVideogame = [...state.videogames];
      const objetosFiltrados = copyVideogame.filter((objeto) => {
        return objeto.genres.some((genre) => genre.name === payload);
      });
      return { ...state, videogames: objetosFiltrados };
    /* case FILTER_DBAPI:
      const videogameCopy = [...state.videogames];
      if(payload === "All") return getVideogames();
      else if(payload === "Db") return 
      else if(payload === "Api")
      return {...state} */
    default:
      return { ...state };
  }
};
export default rootReducer;
