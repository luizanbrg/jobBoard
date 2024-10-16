// middleware/checkAdvertisementOwnership.js
const { Advertisements } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const advertisementId = req.params.id;
    const advertisement = await Advertisements.findByPk(advertisementId);

    if (!advertisement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    if (req.people.role_id === 3 || advertisement.people_id === req.people.id) {
      req.advertisement = advertisement;
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
