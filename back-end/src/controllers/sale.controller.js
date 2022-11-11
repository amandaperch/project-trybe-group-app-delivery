const SalesService = require('../services/sale.service');

class SalesController {
 static async getAll(_req, res) {
 const sale = SalesService.getAll();
  return res.status(200).json(sale);
 }

 static async getByPk(req, res) {
  const { id } = req.params;
  const sale = await SalesService.getByPk(id);
  if ('code' in sale) {
    return res.status(sale.code).json({ message: sale.message });
  }
  return res.status(200).json(sale);
 }
}

module.exports = SalesController;