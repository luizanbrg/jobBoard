const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const advertisementController = require('../controllers/advertisement_controller');
const checkAdvertisementOwnership = require('../middleware/checkAdvertisementOwnership.js');

// Route pour créer une nouvelle annonce
router.post('/create', auth, advertisementController.createAdvertisement);

// Route pour récupérer toutes les annonces
router.get('/', advertisementController.getAllAdvertisements);

// Route pour récupérer toutes les annonces
router.get('/detail/:id', advertisementController.getAdvertisementsDetail);

// Route pour récupérer une annonce par ID
router.get('/show/:id', advertisementController.getAdvertisementById);

// Route pour mettre à jour une annonce
router.put('/update/:id', auth, checkAdvertisementOwnership, advertisementController.updateAdvertisement);

// route pour chercher les types de contract dans la db
router.get('/contract-types', async (req, res) => {
  try {
    const contractTypes = await contractType.findAll();
    res.json(contractTypes);
  } catch (error) {
    console.error('Error fetching contract types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route pour récupérer les annonces d'une compagnie
router.get('/company/:companyId', advertisementController.getAdvertisementsByCompany);



// Route pour supprimer une annonce
router.delete(
  '/:id',
  auth,
  checkAdvertisementOwnership,
  advertisementController.deleteAdvertisement,
);

module.exports = router;
