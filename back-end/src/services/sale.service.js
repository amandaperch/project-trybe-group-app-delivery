const { Sale } = require('../database/models');

class SaleService {
  static async create({ totalPrice, deliveryAddress, deliveryNumber, userId, sellerId }) {
    const sale = await Sale.create({ totalPrice,
      deliveryAddress,
      deliveryNumber,
      userId,
      sellerId,
      });
    return sale;
  }

  static async getAll() {
    const salles = await Sale.findAll();
    return salles;
  }
}

module.exports = SaleService;