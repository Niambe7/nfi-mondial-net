const multer = require("multer");
const path = require("path");

// Configuration de stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Choix du dossier en fonction du type de fichier
    const folder = file.mimetype.startsWith("image") ? "uploads/images" : "uploads/videos";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique pour le fichier
  },
});

// Filtrer les types de fichiers
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/mkv"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non supporté"), false);
  }
};

// Middleware multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50 Mo
  fileFilter: fileFilter,
});

module.exports = upload;
