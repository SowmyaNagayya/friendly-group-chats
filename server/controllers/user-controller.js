
const { User } = require('../models');

module.exports = {
  // create User
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({message: 'Unable to create user'});
    }
    res.status(200).json(user);
  },
  // create message still not sure if we are gonna have chats attached to user or group

  async userLogin(req, res) {
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
    if (userData && validPassword) {
      window.location.href='/dashboard';
    }
  }
}