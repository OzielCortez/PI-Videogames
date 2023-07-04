import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_VIDEOGAME_DETAILS,
  GET_GENRES,
  CREATE_VIDEOGAME,
} from "./actions";
const initialState = {
  videogames: [],
  genres: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEOGAMES:
      return { ...state, videogames: payload };
    case GET_VIDEOGAME_BY_NAME:
      return { ...state, searchResults: payload };
    case GET_VIDEOGAME_DETAILS:
      return { ...state, selectedVideogame: payload };
    case GET_GENRES:
      return { ...state, genres: payload };
    case CREATE_VIDEOGAME:
      return { ...state, videogames: [...state.videogames, payload] };
    default:
      return { ...state };
  }
};
export default rootReducer;
