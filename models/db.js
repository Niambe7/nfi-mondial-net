const { Sequelize } = require("sequelize");

// Configuration pour SQL Server
const sequelize = new Sequelize("desa-db", "sqladmin", "@desa-0506", {
  host: "desa-sql-server.database.windows.net", // Nom de ton serveur Azure
  dialect: "mssql", // Utilisation de SQL Server
  dialectOptions: {
    options: {
      encrypt: true, // Nécessaire pour Azure
      trustServerCertificate: false,
    },
  },
  logging: console.log, // Désactive les logs SQL si besoin avec `false`
});

module.exports = sequelize;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: "mysql",
// });

// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connexion à la base de données réussie !");
//   } catch (error) {
//     console.error("Impossible de se connecter à la base de données :", error);
//   }
// };

// testConnection();

// module.exports = sequelize;