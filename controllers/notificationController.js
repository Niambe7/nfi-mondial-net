const Notification = require("../models/notification");

exports.getNotifications = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Récupère les notifications non lues de l'utilisateur
    const notifications = await Notification.findAll({
      where: { user_id, is_read: false },
      include: [{ model: Commentaire, as: "associatedComment", attributes: ["text"] }],
    });

    if (!notifications.length) {
      return res.status(404).json({ message: "Aucune notification non lue" });
    }

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
    const { notification_id } = req.params;
  
    try {
      // Trouve la notification et la met à jour
      const notification = await Notification.findByPk(notification_id);
      if (!notification) {
        return res.status(404).json({ message: "Notification non trouvée" });
      }
  
      notification.is_read = true;
      await notification.save();
  
      res.status(200).json({ message: "Notification marquée comme lue", notification });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
