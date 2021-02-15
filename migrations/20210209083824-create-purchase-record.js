'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Partners',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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

    await queryInterface.createTable('PurchaseRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      membershipId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Memberships',
          key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
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

    await queryInterface.addConstraint('Seats', {
      fields: ['purchaseRecordId'],
      type: 'foreign key',
      references: {
        table: 'PurchaseRecords',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Memberships');
    await queryInterface.dropTable('PurchaseRecords');
  }
};