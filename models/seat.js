'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Seat.belongsTo(models.UseTicket, {
        foreignKey: 'useticketIdInUse'
      });
      Seat.belongsTo(models.Partner);
      Seat.belongsTo(models.Room);
    }
  };
  Seat.init({
    number: {
      type: DataTypes.INTEGER,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};