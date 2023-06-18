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
    userId: req.auth.user_Id,
    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.path}`
   });

   book.save()
   .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
   .catch(error => res.status(400).json({ error }));

}

exports.updateBook = (req, res, next) => {

    // Si file existe alors on traite le formData sinon on traite directement le body
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/${req.file.path}`
    } : { ...req.body };

    delete bookObject._userId;


    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.user_Id) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                console.log(filename);
                const new_filename = `${req.file.path}`;
                console.log(new_filename);
                // Pour limiter la taille du server on supprime l'image qui n'est plus utilisé
                fs.unlink(`images/${filename}`, () => {
                    Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));    });
              
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}


exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.user_Id) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`./images/${filename}`, () => {
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
