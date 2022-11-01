const UserService = require('../services/user.service');

class UserController {
  static async createUser(req, res) {
    const data = await UserService.createUser(req.body);
    console.log('DATA', data);
    if ('code' in data) return res.status(data.code).json({message: data.message});
    return res.status(201).json({message: "Usuário cadastrado"});
  }
}

module.exports = UserController;