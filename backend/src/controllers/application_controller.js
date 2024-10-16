const { Application } = require('../models');


// =================================================================================================
// Créer une nouvelle annonce
exports.createApplication = async (req, res) => {
  try {
    // Création d'une nouvelle application avec les données reçues
    const application = new Application({
      mail_sent: true,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      advertisement_id: req.body.advertisement_id,
      people_id: req.body.people_id, // Ajouter si nécessaire
    });

    // Sauvegarde de l'application dans la base de données
    await application.save();

    // Envoi de la réponse après la sauvegarde
    res.status(201).json({ message: 'Apply créé', data: application });
  } catch (error) {
    console.error("Erreur lors de la création d'une apply :", error);
    res.status(500).json({ message: "Erreur lors de la création d'une apply", error: error.message });
  }
};

// =================================================================================================
// Vérifier si le candidat a postulé pour une annonce spécifique
exports.checkIfApplied = async (req, res) => {
  try {
    const { advertisement_id, people_id } = req.params;

    const application = await Application.findOne({
      where: {
        advertisement_id: advertisement_id,
        people_id: people_id,
      },
    });

    if (application) {
      res.status(200).json({ hasApplied: true });
    } else {
      res.status(200).json({ hasApplied: false });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la candidature :", error);
    res.status(500).json({ message: "Erreur lors de la vérification de la candidature" });
  }
};
