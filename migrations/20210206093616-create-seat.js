'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      partnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Partners',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      roomId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      // useTicketIdInUse: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'UseTickets',
      //     key: 'id'
      //   },
      //   onUpdate: 'cascade',
      //   onDelete: 'set null'
      // },
      isAvailable: {
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Seats');
  }
};