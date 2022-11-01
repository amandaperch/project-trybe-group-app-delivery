const { Product } = require('../database/models')

class ProductService {
  static async getAll() {
    const products = await Product.findAll()
    console.log('products', products )
    return products;
  }
}

module.exports = ProductService;