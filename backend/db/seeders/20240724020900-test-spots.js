'use strict';
const { Spot } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Baker Street',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'United States',
        lat: 50,
        lng: 43,
        name: 'Fake House',
        description: 'Not a real house.',
        price: 100
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 3,
        address: "456 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 47.7645358,
        lng: -12.4730327,
        name: "Lapp Academy",
        description: "Place where web developers are created",
        price: 125
      },
      {
        ownerId: 2,
        address: "567 DC Lane",
        city: "Gotham City",
        state: "New York",
        country: "United States of America",
        lat: 67.9899,
        lng: 1.98,
        name: "Wayne Manor",
        description: "Batmans House",
        price: 1000
      }


    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Fake House', 'App Academy'] }
    }, {});
  }
};
