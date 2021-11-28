
const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // create User
  async createUser({ body, session }, res) {
    const user = await User.create(body);
    
    if (!user) {
      return res.status(400).json({message: 'Unable to create user'});
    }
    session.save(() => {
      session.user_id = user._id;
      session.loggedIn = true;
      const token = signToken( user );
      res.status(200).json({token, user});
    });
    
  },
  // create message still not sure if we are gonna have chats attached to user or group

  async userLogin({ body, session }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    session.save(() => {
      session.user_id = user._id;
      session.loggedIn = true;
      const token = signToken( user );
      res.status(200).json({token, user});
    });
  },

  async getAllUsers(req, res) {
    const allUsers = await User.find({});

    if (!allUsers) {
      return res.status(400).json({message: 'No users found'});
    }
    res.status(200).json(allUsers);
  },

  async logout(req, res) {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect('/');
      });
    } else {
      res.status(404).end();
    }
  },
}

