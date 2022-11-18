const { SaleProduct, Product, sequelize } = require('../database/models');
const Sale = require('./sale.service');

class saleProductService {
   static async insert({ totalPrice, deliveryAddress, deliveryNumber,
    userId, sellerId, itemsList }) {
      try {
        console.log('USEREID NA SALESPRODUCTSSERVICE:', userId);
      const result = await sequelize.transaction(async (t) => {
        const sale = await Sale.create({ 
          totalPrice, deliveryAddress, deliveryNumber, userId, sellerId,
          }, { transaction: t });
      const productsList = itemsList.map((product) => ({ 
        saleId: sale.id, productId: product.id, quantity: product.quantity }));
      await SaleProduct.bulkCreate(productsList, { transaction: t });
          return sale;
      });
      return { code: 201, data: result };
    } catch (error) {
      console.log(error);
      return { code: 500, message: error.message };
    }
  }

  static async getByPk(id) {
   const sale = SaleProduct.findByPk(id, {
    include: [{ model: Product, as: 'products' }],
   });
   if (!sale) {
    return { code: 404, message: 'Pedido não encontrado' };
  }
  return sale;
}
}

module.exports = saleProductService;