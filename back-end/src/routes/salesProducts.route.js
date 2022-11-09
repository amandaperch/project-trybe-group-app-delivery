const { Router } = require('express');
const SalesProductsController = require('../controllers/salesProducts.controller');

const routerSale = Router();

routerSale.post('/sale', SalesProductsController.create);

module.exports = routerSale;
