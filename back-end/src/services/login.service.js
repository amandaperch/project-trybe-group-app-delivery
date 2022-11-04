const MD5 = require('md5');
const { User } = require('../database/models');

class LoginService {
   static async login(email, password) {
    const passwordEnc = MD5(password);
    console.log(passwordEnc);
    const result = await User.findOne(
      { where: { email, password: passwordEnc } },
      { attributes: { exclude: ['password'] } },
    );
    const { ...searchUser } = result;
    return searchUser;
  }
}

module.exports = LoginService;