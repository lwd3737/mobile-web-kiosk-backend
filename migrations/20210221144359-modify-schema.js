'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addConstraint('Rooms', ['number', 'partnerId', 'seatCount'], {
    //   type: 'allow null'
    // })

    await queryInterface.addColumn('Rooms', 'colSeatCount', {
      type: Sequelize.INTEGER,
      allowNull: false
    })

    await queryInterface.addColumn('Rooms', 'rowSeatCount', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Rooms', 'colSeatCount');
    await queryInterface.removeColumn('Rooms', 'rowSeatCount');

  }
};
