const SalesProductsService = require('../services/salesProducts.service');
const JWTtoken = require('../services/jwt.service');

class SalesProductsController {
 static async create(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: 'Token não encontrado' });
  }
  const userToken = JWTtoken.validate(token);
  console.log('USERTOKEN', userToken);
  if ('code' in userToken) {
    return res.status(userToken.code).json(userToken.message);
  }
  const sale = await SalesProductsService.insert(req.body);
  return res.status(201).json(sale);
 }

 static async getByPk(req, res) {
  const { id } = req.params;
  const sale = SalesProductsService.getByPk(id);
  if ('code' in sale) {
    return res.status(sale.code).json({ message: sale.message });
  }
  return res.status(200).json(sale);
 }
}

module.exports = SalesProductsController;
