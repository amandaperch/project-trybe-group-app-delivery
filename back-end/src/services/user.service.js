const MD5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');

class UserService {
  static async getAll({ name, email }) {
    const user = await User.findAll({
       where: { 
        [Op.or]:[ 
          { name },
          { email },], 
      },},
      {attributes: { exclude: ['password']}
    });

    return user;
  }

  static async createUser({ name, email, password }) {
    const existUser = await this.getAll({ name, email });
    console.log('existUser', existUser);
    if (existUser.length > 0) return { code: 409, message: 'Usuário já cadastrado' };
    const passwordHash = MD5(password);
    const createdUser = await User
    .create({ name, email, password: passwordHash, role: 'customer' || 'seller' || 'administrator'},);
    return createdUser;
  }
}

module.exports = UserService;