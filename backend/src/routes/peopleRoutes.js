const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people_controller');

router.post('/signup', peopleController.signup);
router.post('/login', peopleController.login);

//Route pour récupérer l'utilisateur par ID
router.get('/:id', peopleController.getCandidateById);

module.exports = router;
