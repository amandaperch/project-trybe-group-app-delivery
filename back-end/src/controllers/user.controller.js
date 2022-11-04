const UserService = require('../services/user.service');

class UserController {
  static async createUser(req, res) {
    const user = await UserService.createUser(req.body);
    console.log('USER', user);
    if ('code' in user) return res.status(user.code).json({ message: user.message });
    return res.status(201).json(user);
  }
}

module.exports = UserController;