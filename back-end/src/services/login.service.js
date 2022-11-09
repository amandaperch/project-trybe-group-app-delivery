const MD5 = require('md5');
const { User } = require('../database/models');
const Token = require('./jwt.service');

class LoginService {
   static async login(email, password) {
    const passwordEnc = MD5(password);
    const user = await User.findOne(
      { where: { email, password: passwordEnc },
      attributes: { exclude: ['password'] },
      raw: false,
    },
);
    const newToken = Token.create({ id: user.id,
name: user.name, 
      email: user.email,
role: user.role });
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role, newToken };
    console.log('USER:', user);
    return userData;
  }
}

module.exports = LoginService;