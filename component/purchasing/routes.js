const purchasing = require('./controller');
const { verifyToken } = require('../middleware/verify_token');
const router = require('express').Router();

// find all
router.post('/order', verifyToken, purchasing.create);
// find all pivot
router.get('/order', verifyToken, purchasing.findAll);

router.get('/order/user', verifyToken, purchasing.findAllUser);

router.get('/order/item', verifyToken, purchasing.findAllItem);

module.exports = router;
