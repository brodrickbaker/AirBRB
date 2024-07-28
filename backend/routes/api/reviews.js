const router = require('express').Router();
const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// get all reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    let { user } = req
    user = await User.findOne({
      where: {
        id: user.id
      }
    })
    let reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            { 
                model: User,
                attributes: ["id", "firstName", "lastName"]
             },
            { 
                model: Spot,
                attributes: ["id", "ownerId", "address", "city", "state", "country",
                            "lat", "lng", "name", "price"],
                            include: {
                                model: SpotImage
                            }
             },
            { 
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    })
    reviews = reviews.map(review => {
        review = review.toJSON()
        if (review.Spot.SpotImages[0]){
             review.Spot.previewImage = review.Spot.SpotImages[0].url
        } else review.Spot.previewImage = null;
        delete review.Spot.SpotImages
        return review
    })
   
    res.json({"Reviews": reviews})
  })

  module.exports = router;
