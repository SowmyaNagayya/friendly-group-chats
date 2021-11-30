const db = require('../config/connection');
const { User} = require('../models');

const userData = require('./userData.json');

db.once('open', async () => {
  await User.deleteMany({});
  const users = await User.insertMany(userData);
  process.exit(0);
});