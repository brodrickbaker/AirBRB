'use strict';
const { Review } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        review: 'This place isn\'t real',
        stars: 4
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Where dreams come true!',
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        review: 'Where dreams came true!',
        stars: 3
      },
      {
        userId: 3,
        spotId: 1,
        review: 'This place is fake!',
        stars: 2
      },
      {
        userId: 3,
        spotId: 2,
        review: 'No dreams came true!',
        stars: 1
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2] }
    }, {});
  }
};
