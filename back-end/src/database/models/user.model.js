// src/models/employee.model.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'users',
    underscored: false,
  });

  // Employee.associate = (models) => {
  //   Employee.hasOne(models.Address,
  //     { foreignKey: 'employeeId', as: 'addresses' });
  // };

  return User;
};