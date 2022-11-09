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
}

module.exports = SaleService;