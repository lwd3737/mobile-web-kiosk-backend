'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UseTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UseTicket.belongsTo(models.Membership);
      UseTicket.belongsTo(models.PurchaseRecord);
      UseTicket.belongsTo(models.Seat, {
        foreignKey: 'useticketIdInUse'
      });
    }
  };
  UseTicket.init({
    category: {
      type: DataTypes.STRING
    },
    name:{
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    period: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    unit: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'UseTicket',
  });
  return UseTicket;
};