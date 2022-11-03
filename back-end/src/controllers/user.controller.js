const UserService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const secret = process.env.SECRET || 'secret'

class UserController {
  static async createUser(req, res) {
    const data = await UserService.createUser(req.body);
    const token = jwt.sign({ data: data}, secret)
    console.log('DATA', data);
    if ('code' in data) return res.status(data.code).json({ message: data.message });
    return res.status(201).json(token);
  }

}

module.exports = UserController;