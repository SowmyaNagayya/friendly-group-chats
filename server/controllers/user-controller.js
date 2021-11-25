
const { User } = require('../models');
const { signToken } = require('../utils/auth');

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
    const userData = await User.findOne({ where: { username: req.body.username} && {password: req.body.password}});
    if(!userData) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    } 
    // const correctPw = await userData.isCorrectPassword(userData.password);
    //   if (!correctPw) {
    //     res.status(400).json({ message: 'Incorrect password '});
    //   }

    const token = signToken( userData );
    delete userData.password;
    res.json( { token, userData } );
  }
}