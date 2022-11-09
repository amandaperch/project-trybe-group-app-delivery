const { SaleProduct, sequelize } = require('../database/models');
const Sale = require('./sale.service');

class saleProductService {
   static async insert({ totalPrice, deliveryAddress, deliveryNumber,
    userId, sellerId, itemsList }) {
      try {
        console.log('USERID NA SERVICE:', userId);
      const result = await sequelize.transaction(async (t) => {
        const sale = await Sale.create({ 
          totalPrice, deliveryAddress, deliveryNumber, userId, sellerId,
          }, { transaction: t });
          console.log('SALE', sale);
      const productsList = itemsList.map((product) => ({ 
        saleId: sale.id, productId: product.id, quantity: product.quantity }));
        console.log('ProductList: ', productsList);
      await SaleProduct.bulkCreate(productsList, { transaction: t });
          return sale;
      });
      return { code: 201, data: result };
    } catch (error) {
      console.log(error);
      return { code: 500, message: error.message };
    }
  }
}

module.exports = saleProductService;