
const { User } = require('../models');

module.exports = {
  // create User
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({message: 'Unable to create user'});
    }
    res.status(200).json(user);
  }
  // create message still not sure if we are gonna have chats attached to user or group
}