require("dotenv").config(); // Charger les variables d'environnement depuis .env
const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

// Vérifie que les variables nécessaires sont définies
if (!AZURE_STORAGE_CONNECTION_STRING || !CONTAINER_NAME) {
  throw new Error("Les variables d'environnement nécessaires ne sont pas définies !");
}

// Initialise le client Azure Blob Storage
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Fonction pour uploader un fichier sur Azure Blob Storage
const uploadFileToAzure = async (file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

    const blobName = `${uuidv4()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    return blockBlobClient.url; // URL du fichier sur Azure
  } catch (error) {
    throw new Error("Erreur lors du téléchargement sur Azure : " + error.message);
  }
};

module.exports = { uploadFileToAzure };
