const { Sale } = require('../database/models');

class SaleService {
  static async create({ totalPrice, deliveryAddress, deliveryNumber,
    saleDate, status, useId, sellerId }) {
    const sale = await Sale.create({ totalPrice,
deliveryAddress,
deliveryNumber,
      saleDate,
status,
useId,
sellerId,
});
    return sale;
  }
}

module.exports = SaleService;