const { Videogame } = require("../db.js");

const getVideogamesById = async (id) => {
  try {
    const getVideogame = await Videogame.findByPk(
      id /* , { include: genres } */
    );
    if (!getVideogame)
      return { status: 404, message: "Videogame id doesn't exists" };
    return getVideogame;
  } catch (error) {
    throw { status: error?.status, message: error?.message };
  }
};

module.exports = getVideogamesById;
