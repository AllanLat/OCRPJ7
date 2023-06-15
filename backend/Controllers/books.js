// Controller 
const Book = require('../models/book');
const fs = require('fs');

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
   const bookObject = JSON.parse(req.body.book);
   delete bookObject._id;
   delete bookObject._userId;

   const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });

   book.save()
   .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
   .catch(error => res.status(400).json({ error }));

}

exports.updateBook = (req, res, next) => {
    if(!req.file){
        Book.findByIdAndUpdate({_id: req.params.id}, {
        ...req.body,
    })
    .then(res.status(200).json({msg: "Livre modifié"}))
    } else {
        
        const bodyBook = JSON.parse(req.body.book)
        
        
        Book.findByIdAndUpdate({_id: req.params.id}, {
            title: bodyBook.title,
            author: bodyBook.author,
            year: bodyBook.year,
            genre: bodyBook.genre,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(res.status(200).json({msg: "Livre modifié avec succès"})) 
        .catch(() => {
            res.status(400).json({msg: "Erreur lors de la modification"})
        })
    } 
     }


exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
    }
