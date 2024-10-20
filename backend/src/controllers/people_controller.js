const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { People, Role } = require('../models');
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
  People.findOne({
    where: { email: req.body.email },
    // include: [
    //   {
    //     model: Role,
    //     as: 'role',
    //   },
    // ],
  })
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
                token: jwt.sign(
                  { peopleId: people.id, role_id: people.role_id },
                  `${process.env.TOKEN}`,
                  {
                    expiresIn: '24h',
                  },
                ),
                id: people.id,
                role_id: people.role_id,
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
// Récupérer tous les utilisateur
exports.getAllPeople = async (req, res) => {
  try {
    // Appel direct à la base de données sans synchronisation répétée
    const peoples = await People.findAll({
      attributes: ['id', 'last_name', 'first_name', 'email', 'city', 'role_id'],
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name'],
        },
      ],
    });
    console.log(peoples);
    if (!peoples || peoples.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
    }

    // Envoi des données en réponse avec un statut 200
    res.status(200).json(peoples);
  } catch (error) {
    // Gestion d'erreur avec un statut 500 et un message
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// =================================================================================================
// Récupérer l'utilisateur
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
    delete candidateData.password; // Suppression du mot de passe

    // Envoi des données en réponse avec un statut 200
    res.status(200).json({ message: 'Profil affiché avec succès', data: getProfile });
  } catch (error) {
    // Gestion d'erreur avec un statut 500 et un message
    console.error('Erreur lors de la récupération du candidat :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données du candidat' });
  }
};

// =================================================================================================
// Créer un nouveau utilisateur
exports.createPeople = async (req, res) => {
  try {

    // Générer un mot de passe aléatoire
    const randomPassword = crypto.randomBytes(8).toString('hex'); // Mot de passe de 16 caractères

    // Hasher le mot de passe généré
    const hashedPassword = await bcrypt.hash(randomPassword, 10);


    const people = new People({
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      phone: req.body.phone,
      city: req.body.city,
      email: req.body.email,
      password: hashedPassword, 
      role_id:1,
      // resume: req.body.resume
    });

    await people.save();

    res.status(201).json({ message: 'L\'utilisateur a été créé', data: people });
  } catch (error) {
    console.error("Erreur lors de la création du candidat :", error);
    res.status(500).json({ message: "Erreur lors de la création du candidat", error: error.message });
  }
};

// =================================================================================================
// Supprime un utilisateur
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
