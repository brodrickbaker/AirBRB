'use strict';
const { SpotImage } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://i.ibb.co/JHCnZMZ/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.webp',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.ibb.co/tpD5DcP/08-WYG-CA-sanfrancisco-super-Jumbo.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/DrcGM9W/craftsman-exterior.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/JHCnZMZ/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/LNHck9B/1-0-Zaj-HBk-V09-Oj-IYLsvr81l-Q.webp',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.ibb.co/tpD5DcP/08-WYG-CA-sanfrancisco-super-Jumbo.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/DrcGM9W/craftsman-exterior.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/JHCnZMZ/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/LNHck9B/1-0-Zaj-HBk-V09-Oj-IYLsvr81l-Q.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.ibb.co/tpD5DcP/08-WYG-CA-sanfrancisco-super-Jumbo.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/DrcGM9W/craftsman-exterior.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/JHCnZMZ/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/LNHck9B/1-0-Zaj-HBk-V09-Oj-IYLsvr81l-Q.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.ibb.co/tpD5DcP/08-WYG-CA-sanfrancisco-super-Jumbo.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/DrcGM9W/craftsman-exterior.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/JHCnZMZ/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/LNHck9B/1-0-Zaj-HBk-V09-Oj-IYLsvr81l-Q.webp',
        preview: false
      }   
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      spotId: 1
    }, {});
  }
};
