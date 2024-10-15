const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
    req.people = { id: decodedToken.peopleId, role_id: decodedToken.role_id };

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
  console.log('auth done');
};
