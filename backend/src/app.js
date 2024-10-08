const express = require('express');
const app = express();

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('', process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('success connexion db');
  } catch (error) {
    console.error('error', error);
  }
}

testConnection();

app.use((req, res) => {
  res.json({ message: 'ça marche' });
});

module.exports = app;
