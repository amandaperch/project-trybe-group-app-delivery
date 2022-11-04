const Token = require('../services/jwt.service');

class TokenController {
   static async token(req, res) {
    try {
      const token = req.headers.authorization;
      const validateToken = Token.validate(token)
      return res.status(200).json(validateToken);
    } catch(error){
      return res.status(403).json({ message: error.message});
    }
}}

module.exports = TokenController;