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
    colSeatCount: DataTypes.INTEGER,
    rowSeatCount: DataTypes.INTEGER, 
    seatCount: DataTypes.INTEGER
  }, {
    hooks: {
      beforeValidate: (room) => {
        const { colSeatCount, rowSeatCount } = room;
        room.seatCount = colSeatCount * rowSeatCount;
      }
    },
    sequelize,
    modelName: 'Room',
  });
  return Room;
};