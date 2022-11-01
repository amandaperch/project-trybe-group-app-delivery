const ProductService = require('../services/products.service');

class ProductController {
  static async getAll(_req, res) {
    console.log('product')
    const product = await ProductService.getAll();
    return res.status(200).json(product);
  }
}

module.exports = ProductController;