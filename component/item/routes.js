
const item = require('./controller');
const { verifyToken } = require('../middleware/verify_token');
const router = require('express').Router();

// login
router.post('/create', verifyToken, item.create);
//register
router.get('/list-item', item.getAll);

router.get('/list-item/me', verifyToken, item.getme);

module.exports = router;
