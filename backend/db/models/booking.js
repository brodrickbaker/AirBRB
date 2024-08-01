'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      Booking.belongsTo(
        models.User, {
          foreignKey: 'userId'
        }
      );
      Booking.belongsTo(
        models.Spot, {
          foreignKey: 'spotId'
        }
      );
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isPresent(val){
          if (val <  new Date()) {
            throw new Error ('startDate cannot be in the past')
          }
        }
      }
    },
    endDate: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStart(val){
          if (val <= this.startDate) {
            throw new Error ('endDate cannot be on or before startDate')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
