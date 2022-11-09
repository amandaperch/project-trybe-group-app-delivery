require('dotenv/config');
const jwt = require('jsonwebtoken');

const token = {
  create(userData) {
  const code = jwt.sign(userData, process.env.JWT_SECRET, {
     expiresIn: '7d',
     algorithm: 'HS256',
 });
  return code;
  },
  validate(userToken) {
    const data = jwt.verify(userToken, process.env.JWT_SECRET);
    return data;
  },
};

module.exports = token;