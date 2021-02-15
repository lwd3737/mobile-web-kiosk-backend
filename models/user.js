'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Partner, {
        foreignKey: 'ownerId'        
      });

      User.belongsToMany(models.Partner, {
        through: models.Membership
      });
    }
  };
  User.init({
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};