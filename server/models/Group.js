const { Schema, model } = require('mongoose');
const User = require('./User');

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    }
  ],
});

const Group = model('Group', groupSchema);

module.exports = Group;