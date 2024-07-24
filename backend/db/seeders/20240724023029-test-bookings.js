'use strict';
const { Booking } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2024-08-09',
        endDate: '2024-08-11'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2024-10-09',
        endDate: '2024-10-11'
      }
    ], {validate: true})
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2] }
    }, {});
  }
};
