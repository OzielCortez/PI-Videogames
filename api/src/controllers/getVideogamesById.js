const { Videogame } = require("../db.js");
const { Genre, Platforms } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const axios = require("axios");

const getVideogamesById = async (id) => {
  try {
    if (id.includes("-")) {
      let getVideogame = await Videogame.findOne({
        where: { id },
        include: [
          { model: Genre, through: { attributes: [] } },
          { model: Platforms, through: { attributes: [] } },
        ],
      });

      if (!getVideogame)
        return { status: 404, message: "Videogame id doesn't exists" };

      getVideogame.genres.map((genre) => genre.name);
      getVideogame.platforms.map((platform) => platform.name);

      return getVideogame;
    }

    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
    );

    const data = response.data;

    const getVideogame = {
      id: data.id,
      name: data.name,
      description: data.description,
      release_date: data.released,
      rating: data.rating,
      image: data.background_image,
      genres: data.genres.map((genre) => genre.name),
      platforms: data.platforms.map((pl) => pl.platform.name),
    };

    return getVideogame;
  } catch (error) {
    throw { status: error?.status, message: error?.message };
  }
};

module.exports = getVideogamesById;
