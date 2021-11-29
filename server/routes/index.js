const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

module.exports = router;