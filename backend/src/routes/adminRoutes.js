const express = require('express');
const router = express.Router();

const advertisementController = require('../controllers/advertisement_controller');
const peopleController = require('../controllers/people_controller');
const auth = require('../middleware/auth');

// routes pour les annonces
router.get('/advertisements', auth, advertisementController.getAllAdvertisements);
router.post('/advertisements', auth, advertisementController.createAdvertisement);
router.get('/advertisements/:id', auth, advertisementController.getAdvertisementById);
router.put('/advertisements/:id', auth, advertisementController.updateAdvertisement);
router.delete('/advertisements/:id', auth, advertisementController.deleteAdvertisement);

// routes pour les utilisateurs
router.get('/adminlists', auth, peopleController.getAllPeople);

// Route pour créer un utilisateur
router.post('/admincreate', peopleController.createPeople);

router.get('/adminpeople/:id', auth, peopleController.getCandidateById);
router.put('/adminpeople/:id', auth, peopleController.updatePeople);
router.delete('/adminpeople/:id', auth, peopleController.deletePeople);

module.exports = router;
