const router = require('express').Router();

//require CRUD functions from controller here
  const {
    createUser,
  } = require('../../controllers/user-controller');

//use express router to get, post, put, delete here
  router.route('/').post(createUser);

module.exports = router;