
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
    {
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'salesProducts'
    },
  );
  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId', 
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: UserBook,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SaleProduct;
};
