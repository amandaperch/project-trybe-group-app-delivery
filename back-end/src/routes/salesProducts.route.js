const { Router } = require('express');
const SalesProductsController = require('../controllers/salesProducts.controller');

const routerSale = Router();

routerSale.post('/sale', SalesProductsController.create);
// routerSale.get('/sale/:id', SalesProductsController.getByPk);

module.exports = routerSale;
