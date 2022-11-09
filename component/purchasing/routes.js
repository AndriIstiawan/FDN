
const purchasing = require('./controller');
const router = require('express').Router();

// find all
router.get('/order', purchasing.create);
// find all pivot
// router.get('/order/pivot', purchasing.findAllPivot);

module.exports = router;
