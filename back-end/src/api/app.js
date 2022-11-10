const express = require('express');
const cors = require('cors');
const routerLogin = require('../routes/login.route');
const routerUser = require('../routes/user.route');
const routerSeller = require('../routes/seller.route');
const routerProduct = require('../routes/products.route');
const routerSale = require('../routes/salesProducts.route');
const routerToken = require('../routes/token.route');
const routerSaleAll = require('../routes/sale.router');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/', routerLogin);
app.use(routerUser);
app.use(routerSeller);
app.use(routerProduct);
app.use(routerSale);
app.use(routerSaleAll);
app.use(express.static('public'));
app.use(routerToken);

module.exports = app;
