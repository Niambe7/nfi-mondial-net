// const Contenu = require("../models/contenu");
// const Media = require("../models/media");

// exports.createContenuWithMedia = async (req, res) => {
//   const { user_id, title, body, is_public } = req.body;

//   try {
//     // Vérifie si un fichier a été uploadé
//     if (!req.file) {
//       return res.status(400).json({ message: "Aucun fichier téléchargé" });
//     }

//     // Détermine le type de média
//     const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";

//     // Crée le contenu
//     const contenu = await Contenu.create({
//       user_id,
//       title,
//       body,
//       is_public,
//     });

//     // Crée le média associé
//     const media = await Media.create({
//       file_path: req.file.path,
//       type: fileType,
//       contenu_id: contenu.id, // Lien avec le contenu
//     });

//     res.status(201).json({
//       message: "Contenu et média créés avec succès",
//       contenu,
//       media,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Contenu = require("../models/contenu");
const Media = require("../models/media");
const { uploadFileToAzure } = require("../services/azureBlobService");

exports.createContenuWithMedia = async (req, res) => {
  const { user_id, title, body, is_public } = req.body;

  try {
    // Vérifie si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }

    // Télécharge le fichier sur Azure Blob Storage
    const fileUrl = await uploadFileToAzure(req.file);

    // Détermine le type de média
    const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";

    // Crée le contenu
    const contenu = await Contenu.create({
      user_id,
      title,
      body,
      is_public,
    });

    // Crée le média associé
    const media = await Media.create({
      file_path: fileUrl, // Lien vers le fichier sur Azure
      type: fileType,
      contenu_id: contenu.id, // Lien avec le contenu
    });

    res.status(201).json({
      message: "Contenu et média créés avec succès",
      contenu,
      media,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
