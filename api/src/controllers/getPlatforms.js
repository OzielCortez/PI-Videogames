const { Platforms } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const getPlatforms = async () => {
  try {
    const allPlatforms = await Platforms.findAll();
    if (allPlatforms.length !== 0) return allPlatforms;

    const platformsFromApi = await axios.get(
      `https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`
    );
    const data = platformsFromApi.data.results; //
    console.log(platformsFromApi);
    for (let i = 0; i < data.length; i++) {
      const platforms = data[i];
      await Platforms.findOrCreate({
        where: { id: platforms.id, name: platforms.name },
      });
    }

    const newAllPlatforms = await Platforms.findAll();
    return newAllPlatforms;
  } catch (error) {
    throw { status: error?.status, message: error?.message };
  }
};

module.exports = getPlatforms;
