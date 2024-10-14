const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
    const peopleId = decodedToken.peopleId;
    req.auth = {
      peopleId: peopleId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
  console.log('auth done');
};
