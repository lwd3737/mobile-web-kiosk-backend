"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UseTicketCategories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      partnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Partners",
          key: "id",
        },
        onDelete: "cascade",
        onUpdaet: "cascade",
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addColumn(
      "UseTicketDefinitions",
      "useticketCategoryId",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "UseTicketCategories",
          key: "id",
        },
        onDelete: "set null",
        onUpdate: "cascade",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "UseTicketDefinitions",
      "useticketCategoryId"
    );
    await queryInterface.dropTable("UseTicketCategories");
  },
};
