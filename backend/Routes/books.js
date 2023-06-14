// Route 
const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/books');


router.get('/', bookController.viewBooks);
router.get('/:id', bookController.viewBook);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;