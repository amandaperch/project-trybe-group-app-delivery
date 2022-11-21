const { Router } = require('express');
const SellerController = require('../controllers/seller.controller');

const routerSeller = Router();

routerSeller.get('/sellers', SellerController.getAll);

module.exports = routerSeller;