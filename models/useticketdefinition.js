"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UseTicketDefinition extends Model {
    static associate(models) {
      UseTicketDefinition.belongsTo(models.Partner);
      UseTicketDefinition.hasMany(models.UseTicket);
      UseTicketDefinition.belongsTo(models.UseTicketCategory, {
        foreignKey: {
          name: "useticketCategoryId",
        },
      });
    }

    async getApiData() {
      const { id, periodUnit, period, price } = this.dataValues;
      const { name } = (this.UseTicketCategory &&
        this.UseTicketCategory.dataValues) || { name: null };

      return {
        id,
        periodUnit,
        period,
        price,
        name,
      };
    }
  }
  UseTicketDefinition.init(
    {
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
