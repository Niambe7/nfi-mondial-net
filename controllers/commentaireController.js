const Commentaire = require("../models/commentaire");
const Contenu = require("../models/contenu");
const Utilisateur = require("../models/utilisateur");
const Notification = require("../models/notification");

exports.addComment = async (req, res) => {
  const { user_id, contenu_id, text } = req.body;

  try {
    // Vérifie si le contenu existe
    const contenu = await Contenu.findByPk(contenu_id, {
      include: { model: Utilisateur, as: "utilisateur" }, // Inclure le créateur du contenu
    });
    if (!contenu) {
      return res.status(404).json({ message: "Contenu non trouvé" });
    }

    // Vérifie si l'utilisateur existe
    const utilisateur = await Utilisateur.findByPk(user_id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Crée le commentaire
    const commentaire = await Commentaire.create({
      text,
      contenu_id,
      user_id,
    });

    // Crée une notification pour le créateur du contenu
    const notification = await Notification.create({
      message: `Nouveau commentaire sur votre contenu "${contenu.title}" : "${text}"`,
      user_id: contenu.utilisateur.id, // Destinataire de la notification
      commentaire_id: commentaire.id, // Associe la notification au commentaire
    });

    res.status(201).json({
      message: "Commentaire ajouté et notification envoyée",
      commentaire,
      notification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
