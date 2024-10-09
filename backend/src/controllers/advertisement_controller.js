
//const advertisement = require('../models/Advertisement');
const sequelize = require('../database'); 
const { DataTypes } = require('sequelize');

////MODEL
  const Advertisement = sequelize.define('Advertisement', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Advertisement.associate = (models) => {
    Advertisement.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
    Advertisement.hasMany(models.Application, {
      foreignKey: 'advertisement_id',
      as: 'applications',
    });
    Advertisement.hasMany(models.Skill, {
      foreignKey: 'advertisement_id',
      as: 'skills',
    });
  };
////FIN MODEL


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
    console.error("Erreur lors de la récupération des annonces :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des annonces" });
  }
};

// Créer une annonce
exports.createAdvertisement = async (req, res) =>{

}

// Modifier une annonce
exports.putAdvertisement = async (req, res) =>{
  
}



// Supprimer une annonce
exports.deleteAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    const advertisement = await Advertisement.findByPk(id); 

    if (!advertisement) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    await advertisement.destroy();
    res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch {
    console.error("Erreur lors de la suppression de l'annonce : ", error);
    res.status(500).json({ message: "Erreur de la suppression de l'annonce" });
  }
}

