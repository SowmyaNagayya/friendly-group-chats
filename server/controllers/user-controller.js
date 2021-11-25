
const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // create User
  async createUser(req, res) {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    const betterUser = userData.get({plain: true});
    console.log(betterUser);
    res.status(200).json(betterUser);

    if (!user) {
      return res.status(400).json({message: 'Unable to create user'});
    }
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
  },
  
  async getAllUsers(req, res) {
    const allUsers = await User.find({});

    if (!allUsers) {
      return res.status(400).json({message: 'No users found'});
    }
    res.status(200).json(allUsers);
  }
}