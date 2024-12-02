const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Route pour récupérer les notifications non lues
router.get("/:user_id", notificationController.getNotifications);
router.put("/:notification_id/read", notificationController.markAsRead);


module.exports = router;
