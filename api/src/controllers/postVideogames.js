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
    if (!name || !image || !launchDate || !rating)
      return { status: 401, message: "Faltan datos" };
    const createVideogame = await Videogame.create({
      name,
      description,
      image,
      launchDate,
      rating,
    });
    await createVideogame.setGenres(genres);
    await createVideogame.setPlatforms(platforms);
    return createVideogame;
  } catch (error) {
    throw { error: error?.status, message: error?.message };
  }
};
module.exports = postVideogames;
