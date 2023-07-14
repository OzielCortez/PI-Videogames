const { Router } = require("express");
const router = Router();
const getPlatforms = require("../controllers/getPlatforms");

router.get("/", async (req, res) => {
  try {
    const getAllPlatforms = await getPlatforms();

    res.status(200).json(getAllPlatforms);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = router;
