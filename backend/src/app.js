const express = require('express');
const app = express();

app.use((req, res) => {
  res.json({ message: 'ça marche' });
});

module.exports = app;
