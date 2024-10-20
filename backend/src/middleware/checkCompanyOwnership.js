const { Company } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const companyID = req.params.id;
    console.log('Company ID:', companyID);
    const company = await Company.findByPk(companyID);
    console.log('Company ID:', companyID);

    if (!company) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    if (req.people.role_id === 3) {
      req.company = company;
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
