const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Роут регистрации
router.post('/register', registerUser);

// Роут входа
router.post('/login', loginUser);

module.exports = router;
