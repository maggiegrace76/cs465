const router = require('express').Router();
const ctrl = require('../controllers/trips');

router.get('/', ctrl.list);
router.get('/by-code/:code', ctrl.getByCode);
router.get('/:tripId', ctrl.getOne);

module.exports = router;
