const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookController = require('../Controllers/books');

router.get('/', bookController.viewBooks);
router.get('/:id', bookController.viewBook);
router.post('/', multer, bookController.addBook);
router.put('/:id', multer, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
