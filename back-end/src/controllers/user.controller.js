const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.SECRET || 'secret';

class UserController {
  static async createUser(req, res) {
    const data = await UserService.createUser(req.body);
    const token = jwt.sign({ data }, secret);
    console.log('DATA', data);
    if ('code' in data) return res.status(data.code).json({ message: data.message });
    return res.status(201).json(token);
  }
}

module.exports = UserController;