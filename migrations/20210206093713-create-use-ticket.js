'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UseTickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // membershipId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Membership',
      //     key: 'id'
      //   },
      //   onUpdate: 'cascade',
      //   onDelete: 'cascade'
      // },
      name:{
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      period: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      unit: {
        type: Sequelize.STRING
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

    await queryInterface.addColumn('Seats', 'useTicketIdInUse', {
      type: Sequelize.INTEGER,
        references: {
          model: 'UseTickets',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UseTickets');
    await queryInterface.removeColumn('Seats', 'useTicketIdInUse');
  }
};