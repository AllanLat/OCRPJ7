const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
const userCtrl = require('../Controllers/users');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);

module.exports = router;