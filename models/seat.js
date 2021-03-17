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
      Seat.belongsTo(models.Room, {
        foreignKey: 'roomId'
      });
    }

    static async updateRoomSeatCount(room, seats){
      const seatCount = seats ? seats.length : await room.countSeats();

      room.update({
        seatCount
      });
    }

    isAvailable(){
      if(this.useticketIdInUse){
        return true;
      }

      return false;
    }
  };
  Seat.init({
    number: {
      type: DataTypes.INTEGER,
    },
    x: {
      type: DataTypes.INTEGER,
    },
    y: {
      type: DataTypes.INTEGER,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    hooks: {
      afterSave: (seat) => {
        seat.isAvailable = seat.useticketIdInUse ? true : false;
      }
    },
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};