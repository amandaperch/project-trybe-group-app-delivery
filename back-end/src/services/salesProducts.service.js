const { SaleProduct, sequelize } = require('../database/models');
const Sale = require('./sale.service');

class saleProductService {
   static async insert({ totalPrice, deliveryAddress, addressNumber, saleDate,
    status, userId, sellerId, itemsList }) {
      
      try {
      const result = await sequelize.transaction(async (t) => {
        const sale = Sale.create({ 
          totalPrice, deliveryAddress, addressNumber, saleDate, status, userId, sellerId
          },
          { transaction: t });

      const productsList = itemsList.map((product) => ({
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
      }))

      await SaleProduct.bulkCreate(productsList, { transaction: t });
          return sale;
      });
      return { code: 201, data: result };;
    } catch (error) {
      console.log(error);
      return { code: 500, message: error.message };
    }
  }
}

module.exports = saleProductService;