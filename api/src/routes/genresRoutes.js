const { Router } = require("express");
const router = Router();
const getGenres = require("../controllers/getGenres");

router.get("/", async (req, res) => {
  try {
    const getAllGenres = await getGenres();

    res.status(200).json(getAllGenres);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = router;
