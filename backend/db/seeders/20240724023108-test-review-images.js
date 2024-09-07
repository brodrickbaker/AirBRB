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
        url: 'https://i.ibb.co/TMcmbr1/pexels-photo-1571460.jpg'
      },
      {
        reviewId: 2,
        url: 'https://i.ibb.co/TMcmbr1/pexels-photo-1571460.jpg',
      },
      {
        reviewId: 3,
        url: 'https://i.ibb.co/LtrBhcL/1000-F-261892957-6jy-BXv-Eg-M79i-Yr1e-Ei-JKCosn-VPJdv-HHr.jpg',
      },
      {
        reviewId: 4,
        url: 'https://i.ibb.co/LtrBhcL/1000-F-261892957-6jy-BXv-Eg-M79i-Yr1e-Ei-JKCosn-VPJdv-HHr.jpg',
      },
      {
        reviewId: 5,
        url: 'https://i.ibb.co/YZx25wP/Massey-H-G-Broadlands-329.jpg'
      },
      {
        reviewId: 6,
        url: 'https://i.ibb.co/YZx25wP/Massey-H-G-Broadlands-329.jpg',
      },
      {
        reviewId: 7,
        url: 'https://i.ibb.co/cgg46x2/PZ325-BUIKII6-TJEREXPWDR4-NYQ.jpg',
      },
      {
        reviewId: 8,
        url: 'https://i.ibb.co/cgg46x2/PZ325-BUIKII6-TJEREXPWDR4-NYQ.jpg',
      },
      {
        reviewId: 1,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg'
      },
      {
        reviewId: 2,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 3,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 4,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 5,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg'
      },
      {
        reviewId: 6,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 7,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 8,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 5,
        url: 'https://i.ibb.co/c1McS9S/fancy-bathroom-ideas-4325947-hero-4777bf14fe2b447b86a21e8a64194c29.jpg'
      },
      {
        reviewId: 6,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 7,
        url: 'https://i.ibb.co/c1McS9S/fancy-bathroom-ideas-4325947-hero-4777bf14fe2b447b86a21e8a64194c29.jpg',
      },
      {
        reviewId: 8,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 1,
        url: 'https://i.ibb.co/c1McS9S/fancy-bathroom-ideas-4325947-hero-4777bf14fe2b447b86a21e8a64194c29.jpg'
      },
      {
        reviewId: 2,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
      {
        reviewId: 3,
        url: 'https://i.ibb.co/c1McS9S/fancy-bathroom-ideas-4325947-hero-4777bf14fe2b447b86a21e8a64194c29.jpg',
      },
      {
        reviewId: 4,
        url: 'https://i.ibb.co/ZWkfcMx/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
      },
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      reviewId: 1
    }, {});
  }
};
