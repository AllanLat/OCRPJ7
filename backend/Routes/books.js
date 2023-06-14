// Route 
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const auth = require('../middleware/auth');

const bookController = require('../Controllers/books');
router.use(bodyParser.json());
router.get('/', bookController.viewBooks);
router.get('/:id', bookController.viewBook);
router.post('/',  auth, bookController.addBook);
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;