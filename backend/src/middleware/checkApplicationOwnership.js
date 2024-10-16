// middleware/checkPeopleOwnership.js
const { Application } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const applyId = req.params.id;
    const apply = await Application.findByPk(applyId);

    if (!apply) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (req.application.role_id === 3 || apply.id === req.application.id) {
      req.apply = apply;
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
