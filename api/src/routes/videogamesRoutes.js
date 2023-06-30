const { Router } = require("express");
const router = Router();
const getVideogames = require("../controllers/getVideogames");
const getVideogamesByName = require("../controllers/getVideogamesByName");
const getVideogameById = require("../controllers/getVideogamesById");
const postVideogames = require("../controllers/postVideogames");

router.get("/", async (req, res) => {
  try {
    const allVideogames = await getVideogames();
    return res.status(200).json(allVideogames);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});
//http://localhost:3001/videogames/name?name=juegoABuscar
router.get("/name", async (req, res) => {
  try {
    const { name } = req.query;
    const videogameGetByName = await getVideogamesByName(name);
    res.status(200).json(videogameGetByName);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const videogameById = await getVideogameById(id);
    res.status(200).json(videogameById);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const response = req.body;
    const videogamePost = await postVideogames(response);
    res.status(200).json(videogamePost);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = router;
