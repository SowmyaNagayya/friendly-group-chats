const mongoose = require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/friendly', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongoose.connection;
