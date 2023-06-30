const { Genre } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const getGenres = async () => {
  try {
    const allGenres = await Genre.findAll();
    if (allGenres.length !== 0) return allGenres;

    const genreFromApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
    );
    const data = genreFromApi.data.results; //
    /* data.results.map(async (gen) => {
      await Genre.findOrCreate({ where: { name: gen.name } });
    }); */
    for (let i = 0; i < data.length; i++) {
      const genre = data[i];
      await Genre.findOrCreate({ where: { id: genre.id, name: genre.name } });
    }

    const newAllGenres = await Genre.findAll();
    return newAllGenres;
  } catch (error) {
    throw { status: error?.status, message: error?.message };
  }
};

module.exports = getGenres;
