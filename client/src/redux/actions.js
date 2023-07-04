import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAILS = "GET_VIDEOGAME_DETAIL";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";

const URL_BASE = "http://localhost:3001";

export const getVideogames = () => {
  return async (dispatch) => {
    const response = await axios.get(URL_BASE + "/videogames");
    dispatch({ type: GET_VIDEOGAMES, payload: response.data });
  };
};

export const getVideogameDetails = (id) => {
  return async (dispatch) => {
    const response = await axios.get(URL_BASE + `/videogames/${id}`);
    return dispatch({ type: GET_VIDEOGAME_DETAILS, payload: response.data });
  };
};

export const createVideogame = (payload) => {
  const endpoint = "http://localhost:3001/videogames";
  return async (dispatch) => {
    axios.post(endpoint, payload).then(({ data }) => {
      return dispatch({ type: CREATE_VIDEOGAME, payload: data });
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const response = await axios.get(URL_BASE + "/genres");
    dispatch({ type: GET_GENRES, payload: response.data });
  };
};

export const getVideogameByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(
      URL_BASE + `/videogames/name?name=${name}`
    );
    return dispatch({ type: GET_VIDEOGAME_BY_NAME, payload: response.data });
  };
};
