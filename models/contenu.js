const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Media = require("./media");

const Contenu = sequelize.define("Contenu", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_public: {
    type: DataTypes.BOOLEAN, // Sequelize gère la conversion en BIT pour SQL Server
    defaultValue: true,
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
  tableName: "Contenus", // Nom explicite de la table
  timestamps: false, // Désactivation des timestamps automatiques
});

// Relation avec Media
Contenu.hasOne(Media, { foreignKey: "contenu_id", as: "media" });
Media.belongsTo(Contenu, { foreignKey: "contenu_id", as: "contenu" });

module.exports = Contenu;
