const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
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

const Group = model('Group', GroupSchema);
module.exports = Group;