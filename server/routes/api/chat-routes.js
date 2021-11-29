const router = require('express').Router();

//require CRUD functions from controller here
  const {
    createChat,
    getAllChatsForOneGroup,
  } = require('../../controllers/chat-controller')

//use express router to get, post, put, delete here
  router.route('/').post(createChat);
  router.route('/:id').get(getAllChatsForOneGroup);

module.exports = router;