const router = require('express').Router();
const userRoutes = require('./user-routes');
const groupRoutes = require('./group-routes');
const chatRoutes = require('./chat-routes');

router.use('/user', userRoutes);
router.use('/group', groupRoutes);
router.use('/chat', chatRoutes);

module.exports = router;