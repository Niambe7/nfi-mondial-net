// const multer = require("multer");
// const path = require("path");

// // Configuration de stockage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Choix du dossier en fonction du type de fichier
//     const folder = file.mimetype.startsWith("image") ? "uploads/images" : "uploads/videos";
//     cb(null, folder);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique pour le fichier
//   },
// });

// // Filtrer les types de fichiers
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/mkv"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Type de fichier non supporté"), false);
//   }
// };

// // Middleware multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50 Mo
//   fileFilter: fileFilter,
// });

// module.exports = upload;

const multer = require("multer");
const { uploadFileToAzure } = require("../services/azureBlobService"); // Import du service Azure

// Configuration Multer pour stocker les fichiers en mémoire
const storage = multer.memoryStorage(); // Stocke les fichiers en mémoire
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50 Mo
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/mkv"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non supporté"), false);
    }
  },
});

// Middleware pour gérer le téléchargement et l'upload vers Azure Blob Storage
const uploadToAzure = async (req, res, next) => {
  try {
    // Vérifie si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }

    // Télécharge le fichier sur Azure Blob Storage
    const fileUrl = await uploadFileToAzure(req.file);

    // Ajoute l'URL du fichier à `req` pour qu'il soit accessible dans les contrôleurs
    req.fileUrl = fileUrl;

    // Passe au middleware suivant ou au contrôleur
    next();
  } catch (error) {
    console.error("Erreur lors de l'upload vers Azure :", error);
    // Passe l'erreur au middleware global de gestion des erreurs
    next(error);
  }
};

module.exports = { upload, uploadToAzure };
