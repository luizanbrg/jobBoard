const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const advertisementController = require('../controllers/advertisement_controller');
const checkAdvertisementOwnership = require('../middleware/checkAdvertisementOwnership.js');

// Route pour créer une nouvelle annonce
router.post('/create', auth, advertisementController.createAdvertisement);

// Route pour récupérer toutes les annonces
router.get('/', advertisementController.getAllAdvertisements);

// Route pour récupérer une annonce par ID
router.get('/:id', advertisementController.getAdvertisementById);

// Route pour mettre à jour une annonce
router.put('/:id', auth, checkAdvertisementOwnership, advertisementController.updateAdvertisement);

// Route pour supprimer une annonce
router.delete(
  '/:id',
  auth,
  checkAdvertisementOwnership,
  advertisementController.deleteAdvertisement,
);

module.exports = router;
