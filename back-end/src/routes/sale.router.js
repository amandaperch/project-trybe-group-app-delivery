const { Router } = require('express');
const SaleController = require('../controllers/sale.controller');

const routerSale = Router();

routerSale.get('/saleAll', SaleController.getAll);
routerSale.get('/sale/:id', SaleController.getByPk);

module.exports = routerSale;