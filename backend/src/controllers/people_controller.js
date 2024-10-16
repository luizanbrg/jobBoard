const bcrypt = require('bcrypt');
const { People } = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const role = req.body.role_id || 1;
      const people = new People({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        role_id: role,
      });
      people
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => {
          console.log('Erreur lors de la sauvegarde:', error);
          res.status(400).json({ error: error.message || 'Erreur de validation' });
        });
    })
    .catch(error => {
      console.log('Erreur lors du hash:', error);
      res.status(500).json({ error: error.message });
    });
};

exports.login = (req, res, next) => {
  People.findOne({ where: { email: req.body.email } })
    .then(people => {
      if (people === null) {
        res.status(401).json({ message: 'Mot de passe et/ou e-mail incorrects' });
      } else {
        bcrypt
          .compare(req.body.password, people.password)
          .then(valid => {
            if (!valid) {
              res.status(401).json({ message: 'Mot de passe et/ou e-mail incorrects' });
            } else {
              res.status(200).json({
                peopleId: people.id,
                token: jwt.sign({ peopleId: people.id }, `${process.env.TOKEN}`, {
                  expiresIn: '24h',
                }),
                role_id: people.role_id,
                id: people.id,
              });
            }
          })
          .catch(error => {
            console.log('deu ruim na autentificacao');
            res.status(500).json({ error });
          });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

// =================================================================================================

exports.getAllPeople = async (req, res) => {
  try {
    // Appel direct à la base de données sans synchronisation répétée
    const peoples = await People.findAll();
    console.log(peoples);

    // Envoi des données en réponse avec un statut 200
    res.status(200).json(advertisements);
  } catch (error) {
    // Gestion d'erreur avec un statut 500 et un message
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// Récupérer toutes l'utilisateur | GET
exports.getCandidateById = async (req, res) => {
  try {
    // Récupération de l'ID depuis les paramètres de l'URL
    const { id } = req.params;

    // Recherche du candidat par ID dans la base de données
    const getProfile = await People.findByPk(id);
    console.log(getProfile);

    // Vérification si le candidat existe
    if (!getProfile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    // Convertir le modèle Sequelize en objet brut et supprimer le champ password
    const candidateData = getProfile.get({ plain: true });
    delete candidateData.password;  // Suppression du mot de passe

    // Envoi des données en réponse avec un statut 200
    res.status(200).json({ message: 'Profil affiché avec succès', data: getProfile });
  } catch (error) {
    // Gestion d'erreur avec un statut 500 et un message
    console.error('Erreur lors de la récupération du candidat :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données du candidat' });
  }
};

exports.deletePeople = async (req, res) => {
  try {
    const { id } = req.params;
    const people = await People.findByPk(id);

    if (!people) {
      return res.status(404).json({ message: 'Utilisateur non trouvée' });
    }

    await people.destroy();

    res.status(200).json({ message: 'Utilisateur supprimée avec succès' });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur : ", error);
    res.status(500).json({ message: "Erreur de la suppression de l'utilisateur" });
  }
};

exports.updatePeople = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password, phone, city, role_id } = req.body;

    const people = await People.findByPk(id);

    if (!people) {
      return res.status(404).json({ message: 'Utilisateur non trouvée' });
    }

    await people.update({
      first_name,
      last_name,
      email,
      password,
      city,
      phone,
      // resume,
      role_id,
    });

    res.status(200).json(people);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};
