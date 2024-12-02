const Utilisateur = require("../models/utilisateur");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifie si l'utilisateur existe
      const utilisateur = await Utilisateur.findOne({ where: { email } });
      if (!utilisateur) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      // Vérifie si le mot de passe est correct
      const isMatch = await bcrypt.compare(password, utilisateur.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }
  
      // Génère un token JWT
      const token = jwt.sign(
        { id: utilisateur.id, email: utilisateur.email },
        process.env.JWT_SECRET || "secret_key", // Clé secrète
        { expiresIn: "1h" } // Durée de validité
      );
  
      // Retourne le token et les infos de l'utilisateur
      res.status(200).json({
        message: "Connexion réussie",
        token,
        utilisateur: {
          id: utilisateur.id,
          username: utilisateur.username,
          email: utilisateur.email,
          is_private: utilisateur.is_private,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.createUtilisateur = async (req, res) => {
    try {
      const utilisateur = await Utilisateur.create(req.body); // Crée l'utilisateur
      res.status(201).json(utilisateur); // Retourne l'utilisateur créé sans mot de passe
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getUtilisateurs = async (req, res) => {
    try {
      const utilisateurs = await Utilisateur.findAll(); // Sequelize récupère tous les utilisateurs
      res.status(200).json(utilisateurs); // Retourne les utilisateurs au format JSON
    } catch (error) {
      res.status(500).json({ error: error.message }); // Gère les erreurs
    }
  };

// Fonction pour récupérer un utilisateur par ID
exports.getUtilisateurById = async (req, res) => {
    try {
      const utilisateur = await Utilisateur.findByPk(req.params.id); // Remplace findById par findByPk
      if (!utilisateur) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(utilisateur);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };