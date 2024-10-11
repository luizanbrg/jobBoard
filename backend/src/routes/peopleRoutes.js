const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people_controller');

router.post('/signup', peopleController.signup);
router.post('/login', peopleController.login);

module.exports = router;
