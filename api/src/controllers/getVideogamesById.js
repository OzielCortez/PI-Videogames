const { Videogame } = require("../db.js");
const { Genre } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const getVideogamesById = async (id) => {
  try {
    const getVideogameDB = await Videogame.findByPk(id, { include: Genre });

    const getVideogameApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
    );

    if (!getVideogame || !getVideogameApi)
      return { status: 404, message: "Videogame id doesn't exists" };
    const getVideogame = [...getVideogameDB, ...getVideogameApi];
    return getVideogame;
  } catch (error) {
    throw { status: error?.status, message: error?.message };
  }
};

module.exports = getVideogamesById;
