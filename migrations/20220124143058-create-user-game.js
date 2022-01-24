'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      difficulty: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      have_won: {
        type: Sequelize.INTEGER
      },
      have_lost: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_games');
  }
};