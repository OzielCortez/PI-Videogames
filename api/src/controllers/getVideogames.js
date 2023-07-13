const { Videogame } = require("../db.js");
const { Genre } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const getVideogamesApi = async () => {
  const pagesquantity = 6;
  let responseVideogames = [];

  for (let index = 1; index < pagesquantity; index++) {
    const getAllVideogamesApi = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`,
      { params: { page: index } }
    );
    const data = getAllVideogamesApi.data.results;
    const games = data.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        image: videogame.background_image,
        rating: videogame.rating,
        releaseDate: videogame.released,
        genres: videogame.genres.map((genre) => genre.name),
        platforms: videogame.platforms.map(
          (platform) => platform.platform.name
        ),
      };
    });
    /* getAllVideogamesApi = await axios.get(data.next); */

    responseVideogames = [...responseVideogames, ...games];
  }
  return responseVideogames;
};

const getVideogamesDB = async () => {
  const getVideogames = await Videogame.findAll({ include: Genre });
  return getVideogames;
};

const getVideogames = async () => {
  try {
    const getAllVideogamesdb = await getVideogamesDB();
    const getAllVideogamesApi = await getVideogamesApi();
    const allVideogames = [...getAllVideogamesdb, ...getAllVideogamesApi];
    return allVideogames;
  } catch (error) {
    throw { status: error?.status, message: error?.message };
  }
};

module.exports = getVideogames;
