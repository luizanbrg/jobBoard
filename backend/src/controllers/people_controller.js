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
                token: jwt.sign({ peopleId: people.id }, 'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h',
                }),
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

// exports.getPeopleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const people = await People.findByPk(id);

//     if (!people) {
//       return res.status(404).json({ message: "Utilisateur ou mot de passe non trouvés" })
//     }
//   }
// }
