const LoginService = require('../services/login.service');

class LoginController {
  static async login(req, res) {
    console.log('REQBODY', req.body);
    const { email, password } = req.body;
    const searchUser = await LoginService.login(email, password);
    if ('code' in searchUser) {
      return res.status(searchUser.code).json({ message: searchUser.message });
    }
    return res.status(200).json(searchUser);
  }
}
module.exports = LoginController;