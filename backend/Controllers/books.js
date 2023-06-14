// Controller 
const Book = require('../models/book');


exports.viewBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

exports.viewBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

exports.addBook = (req, res, next) => {
    delete req.body._id;
    console.log(req);
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));  
}

exports.updateBook = (req, res, next) => {
    console.log('En cours de modification');
}

exports.deleteBook = (req, res, next) => {
    
}