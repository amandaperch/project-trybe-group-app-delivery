const SalesService = require('../services/sale.service');

class SalesController {
 static async getAll(_req, res) {
  const sale = await SalesService.getAll();
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

static async getSalesBySellerId(req, res) {
  console.log('REQ BODY NA CONTROLLER', req.body);
  const { sellerId } = req.body;
  console.log('O SELLER ID NA CONTROLLER é: ', sellerId);
  const sales = await SalesService.getSalesBySellerId(sellerId);
  if ('code' in sales) {
    return res.status(404).json({ message: sales.message });
  }
  return res.status(200).json(sales);
}

static async updateStatus(req, res) {
  const { saleId, newStatus } = req.body;
  const sale = await SalesService.updateStatus({ saleId, newStatus });
  return res.status(200).json(sale);
}
}

module.exports = SalesController;
