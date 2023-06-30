const { Videogame } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const getVideogames = async () => {
  try {
    const getAllVideogames = await Videogame.findAll();
    if (!getAllVideogames)
      return { status: 404, message: "Doesn't find any videogame" };
    const getAllVideogamesApi = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    );

    return getAllVideogames;
  } catch (error) {
    throw { status: error?.status, message: error?.message };
  }
};

module.exports = getVideogames;
