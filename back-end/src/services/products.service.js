const { Product } = require('../database/models');

class ProductService {
  static async getAll() {
    const products = await Product.findAll();
    return products;
  }
}

module.exports = ProductService;