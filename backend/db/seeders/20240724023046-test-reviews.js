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
        review: 'Augue vulputate vivamus tincidunt efficitur fames ad in potenti massa. Penatibus ad amet bibendum dictum habitasse ex arcu. At netus enim aliquam mauris est. Augue integer pretium placerat iaculis ut elit nulla. At interdum sociosqu orci justo fringilla penatibus sociosqu et. Imperdiet iaculis integer per et in placerat. Maximus velit dignissim at; congue vehicula ac fames eros! Nascetur malesuada ullamcorper ullamcorper nisi cursus nisl.',
        stars: 4
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Quis ad conubia a vulputate dapibus lectus ad. Tortor a ut curae ornare ad semper. Tempus aptent suspendisse quis eros nostra vel. Vulputate in lacus cubilia porttitor lacinia leo tristique ad. Sem diam euismod mus taciti rhoncus imperdiet ipsum. Quis sem libero inceptos; est nec sem luctus. Nostra rutrum sollicitudin sapien suscipit dolor fames nam.',
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        review: 'Sociosqu leo semper venenatis volutpat dolor ridiculus eget lorem fringilla. Aliquam facilisi erat ex libero neque. Scelerisque venenatis lorem aenean; magnis sit mattis elementum. Sociosqu libero justo integer; consectetur cubilia lobortis velit. Auctor ornare maximus morbi sem torquent non natoque iaculis. Placerat gravida cursus lacinia rhoncus et. Interdum mi fermentum ullamcorper orci; lacus massa habitasse maximus. Lobortis dui torquent elementum ultrices taciti himenaeos nostra montes.',
        stars: 3
      },
      {
        userId: 3,
        spotId: 1,
        review: 'Lacus iaculis nostra pharetra est consectetur magnis faucibus id? Netus netus vulputate felis pellentesque rhoncus fames lobortis taciti. Ad rutrum posuere erat senectus; turpis curae et fringilla. Potenti malesuada viverra eget habitasse morbi tortor efficitur. Rutrum habitasse ultricies fringilla nisl fermentum interdum sociosqu molestie. Hac aenean efficitur eu odio natoque varius netus.',
        stars: 2
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Augue vulputate vivamus tincidunt efficitur fames ad in potenti massa. Penatibus ad amet bibendum dictum habitasse ex arcu. At netus enim aliquam mauris est. Augue integer pretium placerat iaculis ut elit nulla. At interdum sociosqu orci justo fringilla penatibus sociosqu et. Imperdiet iaculis integer per et in placerat. Maximus velit dignissim at; congue vehicula ac fames eros! Nascetur malesuada ullamcorper ullamcorper nisi cursus nisl.',
        stars: 1
      },
      {
        userId: 1,
        spotId: 2,
        review: 'Augue vulputate vivamus tincidunt efficitur fames ad in potenti massa. Penatibus ad amet bibendum dictum habitasse ex arcu. At netus enim aliquam mauris est. Augue integer pretium placerat iaculis ut elit nulla. At interdum sociosqu orci justo fringilla penatibus sociosqu et. Imperdiet iaculis integer per et in placerat. Maximus velit dignissim at; congue vehicula ac fames eros! Nascetur malesuada ullamcorper ullamcorper nisi cursus nisl.',
        stars: 3
      },
      {
        userId: 2,
        spotId: 1,
        review: 'Quis ad conubia a vulputate dapibus lectus ad. Tortor a ut curae ornare ad semper. Tempus aptent suspendisse quis eros nostra vel. Vulputate in lacus cubilia porttitor lacinia leo tristique ad. Sem diam euismod mus taciti rhoncus imperdiet ipsum. Quis sem libero inceptos; est nec sem luctus. Nostra rutrum sollicitudin sapien suscipit dolor fames nam.',
        stars: 5
      },
      {
        userId: 2,
        spotId: 4,
        review: 'Sociosqu leo semper venenatis volutpat dolor ridiculus eget lorem fringilla. Aliquam facilisi erat ex libero neque. Scelerisque venenatis lorem aenean; magnis sit mattis elementum. Sociosqu libero justo integer; consectetur cubilia lobortis velit. Auctor ornare maximus morbi sem torquent non natoque iaculis. Placerat gravida cursus lacinia rhoncus et. Interdum mi fermentum ullamcorper orci; lacus massa habitasse maximus. Lobortis dui torquent elementum ultrices taciti himenaeos nostra montes.',
        stars: 5
      },
      {
        userId: 3,
        spotId: 4,
        review: 'Lacus iaculis nostra pharetra est consectetur magnis faucibus id? Netus netus vulputate felis pellentesque rhoncus fames lobortis taciti. Ad rutrum posuere erat senectus; turpis curae et fringilla. Potenti malesuada viverra eget habitasse morbi tortor efficitur. Rutrum habitasse ultricies fringilla nisl fermentum interdum sociosqu molestie. Hac aenean efficitur eu odio natoque varius netus.',
        stars: 3
      },

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
