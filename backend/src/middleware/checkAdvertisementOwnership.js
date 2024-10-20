const { Advertisement } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const advertisementId = req.params.id;
    console.log('Advertisement ID:', advertisementId);
    const advertisement = await Advertisement.findByPk(advertisementId);
    console.log('Advertisement ID:', advertisementId);

    if (!advertisement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    // console.log('utilisateur:', req.people);
    // console.log('annonce:', advertisement);
    // console.log('ID do anúncio:', advertisement.id);
    // console.log('people_id do anúncio:', advertisement.people_id);
    // console.log('ID do usuário:', req.people.id);

    if (req.people.role_id === 3 || advertisement.people_id === req.people.id) {
      req.advertisement = advertisement;
      return next();
    } else {
      return res.status(403).json({ message: 'Accès refusé' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error);
    return res
      .status(500)
      .json({ message: 'Erreur lors de la vérification des permissions', error });
  }
};
