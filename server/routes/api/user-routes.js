const router = require('express').Router();

//require CRUD functions from controller here
  const {
    createUser,
  } = require('../../controllers/user-controller');

//use express router to get, post, put, delete here
  router.route('/').post(createUser);

  router.post('/', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username }});

        if(!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
       
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again '});
            return;
        }
        console.log(validPassword);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
        if ()
    } catch (err) {
        res.status(400).json(err);
      }
  });

module.exports = router;