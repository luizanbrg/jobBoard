const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const applicationController = require('../controllers/application_controller.js');
// const checkApplicationOwnership = require('../middleware/checkApplicationOwnership.js');

// Route pour créer une nouvelle candidature
router.post('/create', applicationController.createApplication);

// Route pour récupérer toutes les candidature
router.get('/list', applicationController.getAllApplications);

// // Route pour récupérer une candidature par ID
router.get('/:id', applicationController.getApplicationById);

// // Route pour mettre à jour une candidature
// router.put('/:id', auth, checkApplicationOwnership, applicationController.updateApplication);

// // Route pour supprimer une candidature
router.delete('/:id', auth, applicationController.deleteApplication);

module.exports = router;