'use strict';
const { ReviewImage } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg'
      },
      {
        reviewId: 2,
        url: 'www.fakepix.com',
      },
      {
        reviewId: 3,
        url: 'www.fakepix.com',
      },
      {
        reviewId: 4,
        url: 'www.fakepix.com',
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      reviewId: 1
    }, {});
  }
};
