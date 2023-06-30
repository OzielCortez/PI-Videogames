const { Videogame } = require("../db.js");

const postVideogames = async ({
  /* id, */
  name,
  description,
  platforms,
  image,
  launchDate,
  rating,
  genres,
}) => {
  try {
    if (!name || !platforms || !image || !launchDate || !rating || !genres)
      return { status: 401, message: "Faltan datos" };
    const createVideogame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      launchDate,
      rating,
    });
    await createVideogame.setGenres(genres);
    return createVideogame;
  } catch (error) {
    throw { error: error?.status, message: error?.message };
  }
};
module.exports = postVideogames;
