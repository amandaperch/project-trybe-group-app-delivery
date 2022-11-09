const { Router } = require('express');
const ProductController = require('../controllers/products.controller');

const routerProduct = Router();

routerProduct.get('/products', ProductController.getAll);

module.exports = routerProduct;