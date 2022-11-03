const SellerService = require('../services/seller.service');

class SellerController {
  static async getAll(_req, res) {
    const sellers = await SellerService.getAll();
    return res.status(200).json(sellers);
  }
}

module.exports = SellerController;