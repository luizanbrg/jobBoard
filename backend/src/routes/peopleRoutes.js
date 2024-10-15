const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people_controller');
const auth = require('../middleware/auth');
const checkPeopleOwnership = require('../middleware/checkPeopleOwnership');

// sign up et login uniquement
router.post('/signup', peopleController.signup);
router.post('/login', peopleController.login);

//Route pour récupérer l'utilisateur par ID
router.get('/:id', auth, checkPeopleOwnership, peopleController.getCandidateById);

router.get('/lists', auth, peopleController.getAllPeople);

router.delete('/:id', auth, checkPeopleOwnership, peopleController.deletePeople);

router.put('/:id', auth, checkPeopleOwnership, peopleController.updatePeople);

module.exports = router;
