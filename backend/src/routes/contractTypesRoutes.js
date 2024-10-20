const express = require('express');
const router = express.Router();
const { ContractType } = require('../models');

router.get('/', async (req, res) => {
  try {
    const contractTypes = await ContractType.findAll();
    res.json(contractTypes);
  } catch (error) {
    console.error('Erreur fetching contrats:', error);
    res.status(500).json({ error: 'Erreur de server' });
  }
});

module.exports = router;
