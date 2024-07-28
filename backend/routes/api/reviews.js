const router = require('express').Router();
const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const validReview = require('./spots')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const reviewError = (review, res) => {
    if (!review){
        const err = new Error ("Review couldn't be found") 
        res.status(404)
        return res.json({message:err.message})
    }
}
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
// add image to review based on review id
router.post('/:id/images', requireAuth, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const { url } = req.body

    const review = await Review.findOne({
        where: {
            id: id,
            userId: user.id
        }
    })

    if (reviewError(review, res)) return;

    const currentImages = await review.getReviewImages()
    if (currentImages.length >= 10) {
        res.status(403)
        return res.json({message: "Maximum number of images for this resource was reached"})
    }

    await ReviewImage.create({
        reviewId: id,
        url: url
    })

    await ReviewImage.findAll({
        order: [['id', 'DESC']],
        limit: 1
    }).then(reviewImage => 
        res.json({
            id: reviewImage[0].id,
            url: reviewImage[0].url
        })
    )

})

// update an existing review
router.put('/:id', requireAuth, validReview, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const { review, stars } = req.body

    const userReview = await Review.findOne({
        where: {
            id: id,
            userId: user.id
        }
    })

    if (reviewError(userReview, res)) return;

    await userReview.update({
        review: review,
        stars: stars,
        updatedAt: new Date()
    })

    await Review.findOne({
        where: { id: id }
    }).then(updatedReview => res.json(updatedReview))
})

//delete an existing review
router.delete('/:id', requireAuth, async (req, res) => {
    const { user } = req
    const { id } = req.params

    const userReview = await Review.findOne({
        where: {
            id: id,
            userId: user.id
        }
    })

    if (reviewError(userReview, res)) return;

    await userReview.destroy().then(() => res.json({message: 'Successfully deleted'}))
})

  module.exports = router;
