const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const contenuController = require("../controllers/contenuController");

// Route pour créer un contenu avec un média (image ou vidéo)
router.post("/create", upload.single("media"), contenuController.createContenuWithMedia);

module.exports = router;
