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
      Room.belongsTo(models.Partner, {
        foreignKey: 'partnerId'
      });
      Room.hasMany(models.Seat);
    }

    hasSeats(){
      const seatCount = this.Seats.length;
      console.log('seat count: ', seatCount);
      if(seatCount === 0){
        return false;
      }

      return true
    }

    countSeatsInUse(){
      const seats = this.Seats;
      return seats.filter(seat => !seat.isAvailable).length;
    }

  };
  Room.init({
    number: {
      type: DataTypes.INTEGER,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
    },
    colSeatCount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    rowSeatCount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }, 
    seatCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};