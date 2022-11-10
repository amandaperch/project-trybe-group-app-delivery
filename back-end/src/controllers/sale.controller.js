const SalesService = require('../services/sale.service');

class SalesController {
 static async getAll(req, res) {
 const sale = SalesService.getAll();
  return res.status(200).json(sale);
 }
}

module.exports = SalesController;