// middleware/checkPeopleOwnership.js
const { People } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const peopleId = req.params.id;
    const person = await People.findByPk(peopleId);

    if (!person) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (req.people.role_id === 3 || person.id === req.people.id) {
      req.person = person;
      return next();
    } else {
      return res.status(403).json({ message: 'Accès refusé' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la vérification des permissions', error });
  }
};
