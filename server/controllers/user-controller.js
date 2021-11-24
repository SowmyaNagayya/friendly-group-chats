
const { User } = require('../models');
const { checkPassword } = require('../utils/helpers');
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
    console.log(userData);
    if(!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    } 
  
    // const validPassword = await checkPassword(req.body.password);
    const validPassword = req.body.password === userData.password;

    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password, please try again '});
        return;
    }
    console.log(validPassword);
    const token = signToken(userData);
    delete userData.password;
    res.json( { token, userData } );
  }
}