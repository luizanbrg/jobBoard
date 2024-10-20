const { Application, Advertisement, Company } = require('../models');
const sendMail = require('../mailsender');

// =================================================================================================
// Récupérer toutes les candidatures
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      attributes: [
        'id',
        'last_name',
        'first_name',
        'phone',
        'email',
        'created_at',
        'advertisement_id',
        'people_id',
      ],
      include: [
        {
          model: Advertisement,
          as: 'advertisement',
          attributes: ['title'],
        },
        {
          model: Company,
          as: 'company',
          attributes: ['name'],
        },
      ],
    });
    console.log(applications);
    console.log(applications.map(app => app.advertisement));

    // Envoi de la réponse après la sauvegarde
    res.status(200).json(applications);
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces' });
  }
};

// =================================================================================================
// Créer une nouvelle candidature
exports.createApplication = async (req, res) => {
  try {
    // Création d'une nouvelle application avec les données reçues
    const application = new Application({
      mail_sent: true,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      advertisement_id: req.body.advertisement_id,
      people_id: req.body.people_id,
    });

    // Sauvegarde de l'application dans la base de données
    await application.save();

    const jobTitle = await Advertisement.findOne({
      where: { id: req.body.advertisement_id },
      attributes: ['title'],
    });

    if (jobTitle) {
      await sendMail(req.body.email, jobTitle.title);
    } else {
      console.log("Annonce non trouvée pour envoyer l'e-mail.");
    }

    res.status(201).json({ message: 'Apply créé', data: application });
  } catch (error) {
    console.error("Erreur lors de la création d'une apply :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création d'une apply", error: error.message });
  }
};

// =================================================================================================
// Récupérer une annonce par ID
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByPk(id);

    // const application = await Application.findByPk(id, {
    //   include: [{
    //   model: Advertisement,
    //   as: 'advertisement',
    //   attributes: ['title'],
    //   }],
    // });

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce" });
  }
};

// =================================================================================================
// Mettre à jour une annonce
exports.updateApplication= async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone,
      email,
    } = req.body;


    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    if (req.people.role_id !== 3 && application.people_id !== req.people.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await application.update({
      first_name,
      last_name,
      phone,
      email,
    });

    res.status(200).json(application);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'annonce" });
  }
};

// =================================================================================================
// Supprimer une annonce
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting application with id:', id);
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }

    await application.destroy();

    res.status(200).json({ message: 'Candidature supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la candidature : ', error);
    res.status(500).json({ message: 'Erreur de la suppression de la candidature' });
  }
};
