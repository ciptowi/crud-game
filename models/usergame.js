"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserGame.init(
    {
      UserId: DataTypes.INTEGER,
      difficulty: DataTypes.STRING,
      level: DataTypes.INTEGER,
      have_won: DataTypes.INTEGER,
      have_lost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGame",
    }
  );
  return UserGame;
};
