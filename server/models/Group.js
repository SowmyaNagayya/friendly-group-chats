const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: String,
    required: true,
  },
  chats: {
    type: String,
  },
});

const Group = model('Group', groupSchema);

module.exports = Group;