const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const app = express();

dotenv.config();
const password = process.env.DB_PASSWORD


app.use(express.json());
mongoose.connect(`mongodb+srv://allanlatruffe:${password}@application7.7qaaleg.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
// Gestion du token et admin



// Route en dessou important






module.exports = app;