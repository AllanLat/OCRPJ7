const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const app = express();

// Ajout des routes.
const userRoutes = require('./Routes/users');
const bookRoutes = require('./Routes/books');


// Récupération du content .ENV
dotenv.config();
const password = process.env.DB_PASSWORD

// Connexion DB
mongoose.connect(`mongodb+srv://allanlatruffe:${password}@application7.7qaaleg.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Ajout des middlewares
app.use(express.json());

// Ajout des En-têtes pour eviter les erreur cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Appel des routes
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);


module.exports = app; 