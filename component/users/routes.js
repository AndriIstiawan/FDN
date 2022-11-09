
const order = require('./controller');
const { verifyToken } = require('../middleware/verify_token');
const router = require('express').Router();

// login
router.post('/login', order.login);
//register
router.post('/register', order.register);
//register
router.post('/me', verifyToken, order.profile);

module.exports = router;
