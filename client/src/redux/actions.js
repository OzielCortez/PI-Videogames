import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const ORDER_ALL_VIDEOGAMES = "ORDER_ALL_VIDEOGAMES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_DBAPI = "FILTER_DBAPI";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const SET_PAGE = "SET_PAGE";
export const GET_PLATFORMS = "GET_PLATFORMS";

const URL_BASE = "http://localhost:3001";

export const getVideogames = () => {
  return async (dispatch) => {
    await axios.get(URL_BASE + "/videogames").then(({ data }) => {
      console.log(data);
      return dispatch({ type: GET_VIDEOGAMES, payload: data });
    });
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
    return dispatch({ type: GET_GENRES, payload: response.data });
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    const response = await axios.get(URL_BASE + "/platforms");
    return dispatch({ type: GET_PLATFORMS, payload: response.data });
  };
};

export const getVideogameByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${URL_BASE}/videogames/name?name=${name}`
    );
    return dispatch({ type: GET_VIDEOGAME_BY_NAME, payload: response.data });
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    const response = await axios.get(URL_BASE + `/videogames/${id}`);

    return dispatch({
      type: GET_VIDEOGAME_BY_ID,
      payload: response.data,
    });
  };
};

export const orderAllVideogames = (payload) => {
  return {
    type: ORDER_ALL_VIDEOGAMES,
    payload: payload,
  };
};

export const filterByGenre = (payload) => {
  return {
    type: FILTER_BY_GENRE,
    payload: payload,
  };
};

export const filterDbApi = (payload) => {
  return {
    type: FILTER_DBAPI,
    payload: payload,
  };
};

export const changePage = (payload) => {
  return {
    type: CHANGE_PAGE,
    payload: payload++,
  };
};

export const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload,
  };
};
