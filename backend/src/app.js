const express = require('express');
const cors = require('cors');
const { DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();

// Utilisation de cors
app.use(cors());

// Configuration de CORS
app.use(
  cors({
    origin: '*', // Ou spécifie une origine comme 'http://localhost:4200'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  }),
);

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.sendStatus(200); // Réponse OK pour les requêtes préflight
});

// Autres middlewares
app.use(express.json());

// Routes pour les annonces
const advertisementRoutes = require('./routes/advertisementRoutes');
const peopleRoutes = require('./routes/peopleRoutes');
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/account', peopleRoutes);

//module.exports = sequelize;
module.exports = app;
