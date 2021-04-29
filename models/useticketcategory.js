"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UseTicketCategory extends Model {
    static associate(models) {
      UseTicketCategory.belongsTo(models.Partner);
      UseTicketCategory.hasMany(models.UseTicketDefinition);
    }
  }
  UseTicketCategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UseTicketCategory",
    }
  );
  return UseTicketCategory;
};
