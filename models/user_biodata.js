"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, {
      //   foreignKey: "id",
      //   as: "defaultUser",
      // });
    }
  }
  User_biodata.init(
    {
      fullname: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_biodata",
    }
  );
  return User_biodata;
};
