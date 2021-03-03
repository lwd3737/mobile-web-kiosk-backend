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

    await queryInterface.addColumn('UseTickets', 'membershipId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Memberships',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });

    await queryInterface.addColumn('PurchaseRecords', 'membershipId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Memberships',
        key: 'id',
        onUpdte: 'cascade',
        onDelete: 'set null'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Memberships');
    await queryInterface.removeColumn('UseTickets', 'membershipId');
    await queryInterface.removeColumn('PurchaseRecords', 'membershipId');
  }
};
