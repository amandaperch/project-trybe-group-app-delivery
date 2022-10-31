const LoginService = require('../services/login.service');
// import LoginToken from '../Utils/tokenGenerate';

class LoginController {
  static async login(req, res) {
    console.log('REQBODY', req.body);
    const { email, password } = req.body;
    const searchUser = await LoginService.login(email, password);
    if (!searchUser) return res.status(404).json({message: 'Not found'});
    return res.status(200).json({searchUser});

  }
}

module.exports = LoginController;