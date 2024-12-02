const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./db");
const Contenu = require("./contenu");

const Utilisateur = sequelize.define("Utilisateur", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Cette ligne indique à Sequelize d'ajouter une contrainte UNIQUE
    validate: {
      isEmail: true, // Validation pour vérifier que c'est un email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Crée automatiquement createdAt et updatedAt
  hooks: {
    beforeCreate: async (utilisateur) => {
      if (utilisateur.password) {
        const salt = await bcrypt.genSalt(10);
        utilisateur.password = await bcrypt.hash(utilisateur.password, salt);
      }
    },
    beforeUpdate: async (utilisateur) => {
      if (utilisateur.password) {
        const salt = await bcrypt.genSalt(10);
        utilisateur.password = await bcrypt.hash(utilisateur.password, salt);
      }
    },
  },
});

// Supprime les champs sensibles et redondants lors du renvoi des données
Utilisateur.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password; // Supprime le mot de passe dans la réponse JSON
  return values;
};


// Relation avec Contenu
Utilisateur.hasMany(Contenu, { foreignKey: "user_id", as: "contenus" });
Contenu.belongsTo(Utilisateur, { foreignKey: "user_id", as: "utilisateur" });

module.exports = Utilisateur;
