'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.hasMany(
        models.ReviewImage, {
          foreignKey: 'reviewId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      Review.belongsTo(
        models.User, {
          foreignKey: 'userId'
        }
      );
      Review.belongsTo(
        models.Spot, {
          foreignKey: 'spotId'
        }
      );
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: {
       type: DataTypes.INTEGER,
       allowNull: false,
       validate: {
        isInt: true,
        min: 1,
        max: 5
       }
      }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
