const express = require("express");
const router = express.Router();
const { upload, uploadToAzure } = require("../middlewares/upload"); // Import des middlewares mis à jour
const contenuController = require("../controllers/contenuController");


// Route pour créer un contenu avec un média (image ou vidéo)
router.post(
  "/create",
  (req, res, next) => {
    console.log("Requête reçue pour créer un contenu");
    next();
  },
  upload.single("media"), // Middleware pour gérer l'upload en mémoire
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      console.error("Erreur Multer :", err.message);
      return res.status(400).json({ message: "Erreur lors de l'upload du fichier", error: err.message });
    } else if (err) {
      console.error("Erreur Middleware :", err.message);
      return res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
    }
    next();
  },
  uploadToAzure, // Middleware pour envoyer le fichier à Azure Blob Storage
  contenuController.createContenuWithMedia // Contrôleur pour gérer la création du contenu
);

module.exports = router;
