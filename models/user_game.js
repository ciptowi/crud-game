"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  User_game.init(
    {
      user_id: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      difficulty: DataTypes.STRING,
      level: DataTypes.INTEGER,
      have_won: DataTypes.INTEGER,
      have_lost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_game",
    }
  );
  return User_game;
};
