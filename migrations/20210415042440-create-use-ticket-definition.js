"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UseTicketDefinitions", {
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
        onUpdate: "cascade",
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      period: {
        type: Sequelize.INTEGER,
      },
      periodUnit: {
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

    await queryInterface.addColumn("UseTickets", "useticketDefinitionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "UseTicketDefinitions",
        key: "id",
        onUpdate: "set null",
        onDelete: "set null",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("UseTickets", "useticketDefinitionId");
    await queryInterface.dropTable("UseTicketDefinitions");
  },
};
