const { Schema, model } = require('mongoose');
const Group = require('./Group');
const User = require('./User');

const chatSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: Group
    },
});
  
const Chat = model('Chat', chatSchema);
  
module.exports = Chat;