const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_read: {
    type: DataTypes.BOOLEAN, // Sequelize gère la conversion en BIT pour SQL Server
    defaultValue: false, // Par défaut, la notification n'est pas lue
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "Notifications", // Nom explicite de la table
  timestamps: false, // Désactive les colonnes automatiques `createdAt` et `updatedAt` car on les gère manuellement
});

// Exporter le modèle
module.exports = Notification;
