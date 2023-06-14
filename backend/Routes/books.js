const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.get('/', (req, res, next) => {
    Book.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));

})

router.get('/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });


router.post('/', (req, res, next) => {
    delete req.body._id;
    const thing = new Book({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });