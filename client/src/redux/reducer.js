import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_VIDEOGAME_BY_ID,
  GET_GENRES,
  CREATE_VIDEOGAME,
  ORDER_ALL_VIDEOGAMES,
  FILTER_BY_GENRE,
  FILTER_DBAPI,
  CHANGE_PAGE,
  SET_PAGE,
  GET_PLATFORMS,
} from "./actions";
const initialState = {
  videogames: [],
  genres: [],
  platforms: [],
  searchResults: [],
  videogameDetail: [],
  videogamesBackup: [],
  currentPage: 1,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEOGAMES:
      return { ...state, videogames: payload, videogamesBackup: payload };
    case GET_VIDEOGAME_BY_NAME:
      return { ...state, videogames: payload };
    case GET_VIDEOGAME_BY_ID:
      return { ...state, videogameDetail: payload };
    case GET_GENRES:
      return { ...state, genres: payload };
    case GET_PLATFORMS:
      return { ...state, platforms: payload };
    case CREATE_VIDEOGAME:
      return { ...state, videogames: [...state.videogames, payload] };
    case ORDER_ALL_VIDEOGAMES:
      const videogamesCopy = [...state.videogames];
      const orderVideogames = videogamesCopy.sort((a, b) => {
        if (payload === "A-Z") return a.name.localeCompare(b.name);
        else if (payload === "Z-A") return b.name.localeCompare(a.name);
        else if (payload === "ASC") return a.rating - b.rating;
        else if (payload === "DESC") return b.rating - a.rating;
        else return "";
      });
      return { ...state, videogames: orderVideogames };
    case FILTER_BY_GENRE:
      let copyVideogame = [...state.videogames];

      let objetosFiltrados = [];
      let objetosFiltradosDB = [];
      if (payload === "All") objetosFiltrados = state.videogamesBackup;
      else {
        copyVideogame = state.videogamesBackup;
        objetosFiltrados = copyVideogame.filter((objeto) => {
          return objeto.genres.some(
            (genre) => genre.name === payload || genre === payload
          );
        });
      }
      return { ...state, videogames: objetosFiltrados };
    case FILTER_DBAPI:
      let videogameCopy = [...state.videogames];
      let resultVideogame = [];
      if (payload === "All") {
        resultVideogame = state.videogamesBackup;
      } else if (payload === "Db") {
        videogameCopy = state.videogamesBackup;
        resultVideogame = videogameCopy.filter((v) => v.source === "Db");
      } else if (payload === "Api") {
        videogameCopy = state.videogamesBackup;
        resultVideogame = videogameCopy.filter((v) => !v.source);
      }
      return { ...state, videogames: resultVideogame };
    case CHANGE_PAGE:
      return { ...state, currentPage: payload };
    case SET_PAGE:
      return { ...state, currentPage: payload };
    default:
      return { ...state };
  }
};
export default rootReducer;
