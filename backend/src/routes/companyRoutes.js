const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const companyController = require('../controllers/company_controller.js');
// const checkCompanyOwnership = require('../middleware/checkCompanyOwnership.js');

// Route pour créer une nouvelle entreprise
router.post('/create', companyController.createCompany);

// Route pour récupérer toutes les entreprises
router.get('/list', companyController.getAllCompanies);

// // Route pour récupérer une entreprise par ID
router.get('/show/:id', companyController.getCompanyById);

// // Route pour mettre à jour une entreprise
router.put('/update/:id', auth, companyController.updateCompany);

// // Route pour supprimer une entreprise
router.delete('/:id', auth, companyController.deleteCompany);

module.exports = router;