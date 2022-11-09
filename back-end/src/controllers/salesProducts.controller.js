const SalesProductsService = require('../services/salesProducts.service');

class SalesProductsController {
 static async create(req, res) {
 const sale = SalesProductsService.insert(req.body);
  return res.status(201).json(sale);
 }
}

module.exports = SalesProductsController;