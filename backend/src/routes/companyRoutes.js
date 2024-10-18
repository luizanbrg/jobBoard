const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth.js');
const companyController = require('../controllers/company_controller.js');
// const checkApplicationOwnership = require('../middleware/checkApplicationOwnership.js');

// Route pour créer une nouvelle candidature
// router.post('/create', companyController.createApplication);

// Route pour récupérer toutes les candidature
router.get('/list', companyController.getAllCompanies);

// // Route pour récupérer une candidature par ID
// router.get('/show/:id', companyController.getApplicationById);

// // Route pour mettre à jour une candidature
// router.put('/:id', auth, checkApplicationOwnership, companyController.updateApplication);

// // Route pour supprimer une candidature
// router.delete('/:id', auth, companyController.deleteApplication);

module.exports = router;