const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
  secret: 'Super secret secret',
  cookie: {
    path: '/',
    maxAge: 900000,
  },
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));
//hello

// if (process.env.NODE_ENV === 'production') {
//   console.log("Production environment detected, enabling response of built React client.")
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(routes);

app.use('/*', express.static(path.join(__dirname, '../client/build/index.html')))

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});