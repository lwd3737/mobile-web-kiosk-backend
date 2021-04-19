"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UseTicket extends Model {
    static associate(models) {
      UseTicket.belongsTo(models.Membership);
      UseTicket.belongsTo(models.PurchaseRecord);
      UseTicket.belongsTo(models.Seat, {
        foreignKey: "useticketIdInUse",
      });
      UseTicket.belongsTo(models.UseTicketDefinition);
    }
  }
  UseTicket.init(
    {
      startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      endDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UseTicket",
    }
  );
  return UseTicket;
};
