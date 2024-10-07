const express = require('express');
const app = express();

require('dotenv').config();

app.use((req, res) => {
  res.json({ message: 'ça marche' });
});

module.exports = app;
