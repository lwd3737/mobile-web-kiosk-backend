'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.hasMany(models.PurchaseRecord);
      Membership.hasMany(models.UseTicket);
    }
  };
  Membership.init({
    partnerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Partner',
        key: 'id'
      }
    },
    userId:  {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};