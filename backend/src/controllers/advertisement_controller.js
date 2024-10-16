const { Advertisement } = require('../models');

// const sequelize = require('../models/index');
// const { DataTypes } = require('sequelize');

console.log(`Advertissement`, Advertisement);

// =================================================================================================
// Récupérer toutes les annonces
exports.getAllAdvertisements = async (req, res) => {
  try {
    // Appel direct à la base de données sans synchronisation répétée
    const advertisements = await Advertisement.findAll();
    console.log(advertisements);

    // Envoi des données en réponse avec un statut 200
    res.status(200).json(advertisements);
  } catch (error) {
    // Gestion d'erreur avec un statut 500 et un message
    console.error('Erreur lors de la récupération des annonces :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces' });
  }
};

// =================================================================================================
// Créer une nouvelle annonce
exports.createAdvertisement = async (req, res) => {
  try {
    // const { title, content, skills_id, salary, city, contract_type, company_id, found, publication_date, remote_work, distance } = req.body;
    const { title, content, salary, city } = req.body;

    const advertisement = await Advertisement.create({
      title,
      content,
      // skills_id,
      salary,
      city,
      // contract_type,
      // company_id,
      // found,
      // publication_date,
      // remote_work,
      // distance
    });

    res.status(201).json(advertisement);
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'annonce" });
  }
};

// Récupérer une annonce par ID
exports.getAdvertisementById = async (req, res) => {
  try {
    const { id } = req.params;
    const advertisement = await Advertisement.findByPk(id);

    if (!advertisement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    res.status(200).json(advertisement);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce" });
  }
};

// Mettre à jour une annonce
exports.updateAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      skills_id,
      salary,
      city,
      contract_type,
      company_id,
      found,
      publication_date,
      remote_work,
      distance,
    } = req.body;

    const advertisement = await Advertisement.findByPk(id);

    if (!advertisement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    if (req.people.role_id !== 3 && advertisement.people_id !== req.people.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await advertisement.update({
      title,
      content,
      skills_id,
      salary,
      city,
      contract_type,
      company_id,
      found,
      publication_date,
      remote_work,
      distance,
    });

    res.status(200).json(advertisement);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'annonce" });
  }
};

// Supprimer une annonce
exports.deleteAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting advertisement with id:', id);
    const advertisement = await Advertisement.findByPk(id);

    if (!advertisement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    await advertisement.destroy();

    res.status(200).json({ message: 'Annonce supprimée avec succès' });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce : ", error);
    res.status(500).json({ message: "Erreur de la suppression de l'annonce" });
  }
};
