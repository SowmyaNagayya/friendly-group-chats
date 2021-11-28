const router = require('express').Router();

//require CRUD functions from controller here
  const {
    getAllGroups,
    createGroup,
    getGroup,
    updateGroup,
    removeGroup,
  } = require('../../controllers/group-controller');
const { withAuth } = require('../../utils/auth');

//use express router to get, post, put, delete here
  router.route('/').get(withAuth,getAllGroups);
  router.route('/').post(createGroup);
  router.route('/:id').get(getGroup);
  router.route('/:id').put(updateGroup);
  router.route('/:id').delete(removeGroup);

module.exports = router;