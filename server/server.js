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

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});