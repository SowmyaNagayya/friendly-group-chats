
const { User } = require('../models');
// const checkPassword = require('../utils/helpers');

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

  async userLogin(req, res, next) {
    const userData = await User.findOne({ where: { username: req.body.username} && {password: req.body.password}});
    console.log(userData);
    if(!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    } 
    if (userData ) {
      window.location.href='/dashboard';
    }
  
    // const validPassword = await userData.checkPassword(req.body.password);

    // if (!validPassword) {
    //     res.status(400).json({ message: 'Incorrect username or password, please try again '});
    //     return;
    // }
    // console.log(validPassword);
    // req.session.save(() => {
    //     req.session.user_id = userData.id;
    //     req.session.username = userData.username;
    //     req.session.logged_in = true;

    //     res.json({ user: userData, message: 'You are now logged in!' });
    // });
  }
}