const { Videogame } = require("../db.js");
const { Genre, Platforms } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const getVideogamesByName = async (name) => {
  try {
    /* name = name.toLowerCase().split(" ").join("-");
    console.log(name); */
    const findVideogamesByNameDB = await Videogame.findAll({
      where: { name },
      include: [Genre, Platforms],
    });
    const findVideogamesByNameAPI = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`
    );
    const videogamesAPI = findVideogamesByNameAPI.data.results;
    if (!findVideogamesByNameDB.length && !videogamesAPI.length)
      return {
        status: 404,
        message: "No se encontró ningún videojuego con ese nombre ",
      };
    const fifteenVideogames = [
      ...findVideogamesByNameDB,
      ...videogamesAPI,
    ].slice(0, 15);

    return fifteenVideogames;
  } catch (error) {
    throw { status: error?.response?.status, message: error?.message };
  }
};

module.exports = getVideogamesByName;
