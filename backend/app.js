const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const Book = require('./models/book'); // Assurez-vous que le chemin vers le modèle de livre est correct

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

// Gestion du token et admin



// Route en dessou important

app.get('/api/books', (req, res, next) => {
  Book.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/books/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

app.post('/books', (req, res) => {
   
  // Récupérez les données JSON envoyées dans la requête POST
  const books = require('./data/data.json')

  // Enregistrez les données dans la base de données à l'aide du modèle Mongoose
  Book.insertMany(books)
    .then(() => {
      console.log('Données enregistrées avec succès dans la base de données !');
      res.status(200).send('Données enregistrées avec succès dans la base de données !');
    })
    .catch((error) => {
      console.log('Erreur lors de l\'enregistrement des données dans la base de données :', error);
      res.status(500).send('Erreur lors de l\'enregistrement des données dans la base de données :', error);
    });
});

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Book({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;