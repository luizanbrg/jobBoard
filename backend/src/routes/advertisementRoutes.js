const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement_controller');

// Route pour créer une nouvelle annonce
// router.post('/', advertisementController.createAdvertisement);

// Route pour récupérer toutes les annonces
router.get('/', advertisementController.getAllAdvertisements);

// Route pour récupérer une annonce par ID
// router.get('/:id', advertisementController.getAdvertisementById);

// Route pour mettre à jour une annonce
// router.put('/:id', advertisementController.updateAdvertisement);

// Route pour supprimer une annonce
// router.delete('/:id', advertisementController.deleteAdvertisement);

module.exports = router;
