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
    console.log('USER:', user);
    if (!user) {
      return { code: 404, message: 'Usuário não encontrado' };
    }
    const token = Token.create({ name: user.name, email: user.email, role: user.role });
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role, token };
    return userData;
  }
}

module.exports = LoginService;