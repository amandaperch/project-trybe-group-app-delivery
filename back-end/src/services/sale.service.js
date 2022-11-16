const { Sale, Product, User } = require('../database/models');

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

  static async getByPk(id) {
    const sale = await Sale.findOne({
      where: { id },
      include: [
        { model: Product, as: 'products', attributes: { exclude: ['urlImage'] } }, 
        {
          model: User, as: 'sellers', attributes: { exclude: ['password', 'email', 'id', 'role'] },
        },
      ],
    });
    if (!sale) {
      return { code: 404, message: 'Pedido não encontrado' };
    }
    return sale;
  }

  static async getSalesBySellerId(sellerId) {
    console.log('ENTREI NA SALE SERVICE e o SELLER ID é: ', sellerId);
    const sales = await Sale.findAll({
      where: { sellerId },
    });

    console.log('VENDAS POR VENDEDOR:', sales);

    if (sales.length === 0) {
      return { code: 404, message: 'venda(s) não encontrada(s)' };
    }
    return sales;
  }
}

module.exports = SaleService;
