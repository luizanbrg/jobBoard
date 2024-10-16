const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'token manquant!' });
    }
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
    req.people = { id: decodedToken.peopleId, role_id: decodedToken.role_id };
    console.log('Utilisateur authentifié:', req.people);
    next();
  } catch (error) {
    console.error('Erreur d auth:', error);
    res.status(401).json({ error });
  }
};
