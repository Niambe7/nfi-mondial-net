const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Commentaire = sequelize.define("Commentaire", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING, // Remplacement de TEXT par STRING pour compatibilité avec SQL Server
    allowNull: false,
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
  tableName: "Commentaires", // Nom explicite de la table
  timestamps: false, // Désactivation des colonnes automatiques `createdAt` et `updatedAt`
});

module.exports = Commentaire;
