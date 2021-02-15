'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Partner);
      Room.hasMany(models.Seat);
    }
  };
  Room.init({
    number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    seatCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};