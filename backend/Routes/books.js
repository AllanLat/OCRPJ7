const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const sharp = require('../middleware/sharp-config');
const multer = require('../middleware/multer-config');

const bookController = require('../Controllers/books');

router.get('/', bookController.viewBooks);
router.get('/:id', bookController.viewBook);
router.post('/', auth, multer, sharp, bookController.addBook);
router.put('/:id', auth, multer, sharp, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
