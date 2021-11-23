const db = require('../config/connection');
const { User} = require('../models');

// const groupData = require('./groupData.json');
const userData = require('./userData.json');
// const chatData = require('./chatData.json');

db.once('open', async () => {
//   await Group.deleteMany({});
  await User.deleteMany({});
//   await Chat.deleteMany({});

//   const groups = await Group.insertMany(groupData);
  const users = await User.insertMany(userData);
//   const chats = await Chat.insertMany(chatData);

  console.log('Seeded!');
  process.exit(0);
});