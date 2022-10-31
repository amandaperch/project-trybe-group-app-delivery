const {User} =  require('../database/models');
const  MD5 = require('md5');

class LoginService {

   static login = async (email, password) => {
    const passwordEnc = MD5(password);
    console.log(passwordEnc);
    const searchUser = await User.findOne({ where: { email, password:passwordEnc } });
    return searchUser;
  };
}

module.exports = LoginService;