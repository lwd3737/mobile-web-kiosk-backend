'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseRecord.belongsTo(models.Membership);
      PurchaseRecord.belongsTo(models.UseTicket);
    }
  };
  PurchaseRecord.init({
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PurchaseRecord',
  });
  return PurchaseRecord;
};