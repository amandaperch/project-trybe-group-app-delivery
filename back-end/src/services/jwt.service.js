require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync(`${__dirname}/../../jwt.evaluation.key`).toString();
console.log(secret);

const token = {
  create(userData) {
  const code = jwt.sign(userData, secret, {
     expiresIn: '7d',
     algorithm: 'HS256',
 });
  return code;
  },
  validate(userToken) {
    try {
      return jwt.verify(userToken, secret);
    } catch (_err) {
      return { code: 401, message: 'Token Inválido' };
    }
  },
};

module.exports = token;