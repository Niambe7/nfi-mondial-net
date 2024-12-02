const express = require("express");
const router = express.Router();
const commentaireController = require("../controllers/commentaireController");

// Route pour ajouter un commentaire à un contenu
router.post("/", commentaireController.addComment);

module.exports = router;