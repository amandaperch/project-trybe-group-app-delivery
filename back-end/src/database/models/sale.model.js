// src/models/employee.model.js

const { models } = require("mongoose");

module.exports = (sequelize, DataTypes) => {
  const dateObj = new Date();
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const fullDate = `${day}/${month}/${year}`;
  console.log('FULLDATE', fullDate);
  // const date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: {type: DataTypes.DATE, defaultValue: fullDate},
    status: {type: DataTypes.STRING(50), defaultValue: 'pendente'},
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' });
  };
  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'sellers' });
  };
  
  return Sale;
};