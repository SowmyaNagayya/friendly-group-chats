const router = require('express').Router();
const userRoutes = require('./user-routes');
const groupRoutes = require('./group-routes');

router.use('/user', userRoutes);
router.use('/group', groupRoutes);

module.exports = router;