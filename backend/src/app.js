const express = require('express');
const app = express();

// chemin à mettre pour avoir le .dotenv, copier si besoin des .env ailleurs
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
// chemin fini

app.use((req, res) => {
  res.json({ message: 'ça marche' });
});

module.exports = app;
