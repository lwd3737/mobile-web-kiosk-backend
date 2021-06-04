"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UseTicketDefinition extends Model {
    static periodUnits = [
      ["H", "시간"],
      ["D", "일"],
      ["W", "주"],
      ["M", "개월"],
    ];

    static associate(models) {
      UseTicketDefinition.belongsTo(models.Partner);
      UseTicketDefinition.hasMany(models.UseTicket);
      UseTicketDefinition.belongsTo(models.UseTicketCategory, {
        foreignKey: {
          name: "useticketCategoryId",
        },
      });
    }

    static getPeriodUnitLabel(value) {
      const finded = this.periodUnits.find(
        (periodUnit) => periodUnit[0] === value
      );
      return finded[1];
    }

    static getPeriodUnitValue(label) {
      const finded = this.periodUnits.find(
        (periodUnit) => periodUnit[1] === label
      );
      return finded[0];
    }

    static checkPeriodUnit(value) {
      const finded = this.periodUnits.find(
        (periodUnit) => periodUnit[0] === value
      );
      return finded ? true : false;
    }

    async getApiData() {
      const { id, periodUnit, period, price } = this.dataValues;
      const { name } = (this.UseTicketCategory &&
        this.UseTicketCategory.dataValues) || { name: null };

      return {
        id,
        periodUnit: UseTicketDefinition.getPeriodUnitLabel(periodUnit),
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
