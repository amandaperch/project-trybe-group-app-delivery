const { User } = require('../database/models');

class Sellerservice {
  static async getAll(){
    const sellers = await User.findAll({
      where: { role: 'seller' },
    },);
    return sellers;
  }
}

module.exports = Sellerservice;