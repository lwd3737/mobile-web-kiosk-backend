'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PurchaseRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // membershipId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Memberships',
      //     key: 'id'
      //   },
      //   onDelete: 'set null',
      //   onUpdate: 'cascade'
      // },
      useTicketId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UseTickets',
          key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
      startDate: {
        type: Sequelize.DATE
      },
      dueDate: {
        type: Sequelize.DATE
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

    //await queryInterface.addConstraint('Seats', {
    //  fields: ['purchaseRecordId'],
    //  type: 'foreign key',
    //  references: {
    //    table: 'PurchaseRecords',
    //    field: 'id'
    //  },
    //  onDelete: 'set null',
    //  onUpdate: 'cascade'
    //})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Seats');
    await queryInterface.dropTable('PurchaseRecords');
  }
};