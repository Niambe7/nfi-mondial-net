const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Media = sequelize.define("Media", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false, // Chemin du fichier
  },
  type: {
    type: DataTypes.STRING, // Remplacement de ENUM par STRING pour compatibilité SQL Server
    allowNull: false,
    validate: {
      isIn: [["image", "video"]], // Validation manuelle des valeurs autorisées
    },
  },
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "Media", // Nom explicite de la table
  timestamps: false, // Désactive les colonnes automatiques `createdAt` et `updatedAt`
});

module.exports = Media;