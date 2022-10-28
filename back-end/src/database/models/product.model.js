// src/models/employee.model.js

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING(200),
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'products',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.hasOne(models.User,
      { foreignKey: 'id', as: 'productId' });
  };

  return Product;
};