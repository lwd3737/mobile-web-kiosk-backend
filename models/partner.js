"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Partner.belongsTo(models.User, {
        as: "owner",
        foreignKey: "ownerId",
      });
      Partner.belongsToMany(models.User, {
        through: models.Membership,
      });
      Partner.hasMany(models.Room);
      Partner.hasMany(models.UseTicketDefinition);
    }
  }
  Partner.init(
    {
      serviceCategory: DataTypes.STRING,
      serviceName: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Partner",
    }
  );
  return Partner;
};
