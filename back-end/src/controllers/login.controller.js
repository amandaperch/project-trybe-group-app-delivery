const LoginService = require('../services/login.service');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const secret = process.env.SECRET || 'secret'

class LoginController {
  static async login(req, res) {
    console.log('REQBODY', req.body);
    const { email, password } = req.body;
    const searchUser = await LoginService.login({email, password});
    const token = jwt.sign({ data: searchUser}, secret)
    const user = {...searchUser, token}
    if (!searchUser) return res.status(404).json({ message: 'Not found' });
    console.log(user);
  return res.status(200).json(user);
  }
}
module.exports = LoginController;