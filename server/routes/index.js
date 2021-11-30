const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');
require('dotenv').config();

router.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
    router.use('*', express.static(path.join(__dirname, '../client/build')));
}

module.exports = router;