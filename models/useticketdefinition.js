"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UseTicketDefinition extends Model {
    static associate(models) {
      UseTicketDefinition.belongsTo(models.Partner);
      UseTicketDefinition.hasMany(models.UseTicket);
    }
  }
  UseTicketDefinition.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      period: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      periodUnit: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UseTicketDefinition",
    }
  );
  return UseTicketDefinition;
};
