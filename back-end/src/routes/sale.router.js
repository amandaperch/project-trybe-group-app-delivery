const { Router } = require('express');
const SaleController = require('../controllers/sale.controller');

const routerSale = Router();

routerSale.get('/saleAll', SaleController.getAll);
routerSale.post('/sale/seller', SaleController.getSalesBySellerId);
routerSale.get('/sale/:id', SaleController.getByPk);
routerSale.patch('/sale/update', SaleController.updateStatus);

module.exports = routerSale;