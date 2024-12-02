const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Récupère le token du header Authorization

  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = decoded; // Stocke les infos du token dans la requête
    next();
  } catch (error) {
    res.status(403).json({ message: "Token invalide" });
  }
};

module.exports = authenticate;
