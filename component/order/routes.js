
const order = require('./controller');
const router = require('express').Router();

// find all
router.get('/order', order.findAll);
// find all pivot
router.get('/order/pivot', order.findAllPivot);

module.exports = router;
