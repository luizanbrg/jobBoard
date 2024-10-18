const { Company } = require('../models');

// =================================================================================================
// Récupérer toutes les candidatures
exports.getAllCompanies = async (req, res) => {
  try {

    const companies = await Company.findAll({
      attributes: ['id','name', 'city', 'address']
    });
    console.log(companies);
    // console.log(companies.map(app => app.companies_id));

    // Envoi de la réponse après la sauvegarde
    res.status(200).json(companies);
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces' });
  }
};


// =================================================================================================
// Créer une nouvelle candidature
exports.createCompany = async (req, res) => {
  try {
    // Création d'une nouvelle company avec les données reçues
    const company = new Company({
      name: req.body.name,
      city: req.body.city,
      email: req.body.email,
      address: req.body.address,
      content: req.body.content,
      // picture: req.body.picture,
    });

    // Sauvegarde de la company dans la base de données
    await company.save();


    res.status(201).json({ message: 'Company créé', data: company });
  } catch (error) {
    console.error("Erreur lors de la création la company :", error);
    res.status(500).json({ message: "Erreur lors de la création la company", error: error.message });
  }
};


// =================================================================================================
// Récupérer une annonce par ID
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

        // const application = await Application.findByPk(id, {
    //   include: [{
    //   model: Advertisement,
    //   as: 'advertisement',  
    //   attributes: ['title'], 
    //   }],
    // });

    if (!company) {
      return res.status(404).json({ message: 'Company non trouvée' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Erreur lors de la récupération de la company :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de la company" });
  }
};

// =================================================================================================
// Supprimer une compagnie
// exports.deleteCompany = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting company with id:', id);
//     const company = await Company.findByPk(id);

//     if (!company) {
//       return res.status(404).json({ message: 'Company non trouvée' });
//     }

//     await company.destroy();

//     res.status(200).json({ message: 'Company supprimée avec succès' });
//   } catch (error) {
//     console.error("Erreur lors de la suppression de la company : ", error);
//     res.status(500).json({ message: "Erreur de la suppression de la company" });
//   }
// };


// =================================================================================================
// Mettre à jour une annonce
exports.updateCompany= async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      content,
      city,
      address,
      // picture
    } = req.body;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    if (req.people.role_id !== 3 && company.people_id !== req.people.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await company.update({
      name,
      content,
      city,
      address,
      // picture
    });

    res.status(200).json(company);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'annonce" });
  }
};

