const MD5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const Token = require('./jwt.service');

class UserService {
  static async getAll({ name, email }) {
    const user = await User.findAll({
      where: {
        [Op.or]: [
          { name },
          { email },
        ],
      },
    });

    return user;
  }

  static async createUser({ name, email, password, role }) {
    const existUser = await this.getAll({ name, email });
    if (existUser.length > 0) return { code: 409, message: 'Usuário já cadastrado' };
    const passwordHash = MD5(password);
    const user = await User
    .create({ name, email, password: passwordHash, role });
    const newToken = Token.create({ 
      id: user.id, name: user.name, email: user.email, role: user.role,
    });
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role, newToken };

    return userData;
  }
}

module.exports = UserService;