const express = require('express');
const emailAuth = require('../middlewares/emailAuth');
const passwordAuth = require('../middlewares/passwordAuth');

const generateToken = (tokenLength) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < tokenLength; i += 1) {
    result += randomChars.charAt(Math.round(Math.random() * tokenLength));
  }

  return result;
};

const route = express.Router();

route.post('/', emailAuth, passwordAuth, (_req, res) => {
  const token = generateToken(16);
  return res.status(200).json({ token });
});

module.exports = route;