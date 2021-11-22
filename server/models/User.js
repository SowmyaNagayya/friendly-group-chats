const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: {
    type: String,
  },
});

const User = model('User', userSchema);

module.exports = User;
