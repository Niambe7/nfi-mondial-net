// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");
// const contenuController = require("../controllers/contenuController");

// // Route pour créer un contenu avec un média (image ou vidéo)
// router.post("/create", upload.single("media"), contenuController.createContenuWithMedia);

// module.exports = router;

    
const express = require("express");
const router = express.Router();
const { upload, uploadToAzure } = require("../middlewares/upload"); // Import des middlewares mis à jour
const contenuController = require("../controllers/contenuController");

// Route pour créer un contenu avec un média (image ou vidéo)
router.post(
  "/create",
  upload.single("media"), // Middleware pour gérer l'upload en mémoire
  uploadToAzure, // Middleware pour envoyer le fichier à Azure Blob Storage
  contenuController.createContenuWithMedia // Contrôleur pour gérer la création du contenu
);

module.exports = router;
