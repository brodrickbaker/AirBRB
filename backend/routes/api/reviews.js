const router = require('express').Router();
const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview, preview, notFound, notAuthorized } = require('../../utils/checks');

// get all reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
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
        const spot = review.Spot
        review.Spot.previewImage = preview(spot)
        delete review.Spot.SpotImages
        return review
    })
    return res.json({"Reviews": reviews})
  })
// add image to review based on review id
router.post('/:id/images', requireAuth, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const { url } = req.body
    const review = await Review.findOne({
        where: {
            id: id
        }
    })

    if (notFound(review, res, 'Review')) return;
    if (notAuthorized(review, user, res)) return;

    const currentImages = await review.getReviewImages()
    
    if (currentImages.length >= 10) {
        return res.status(403).json({message: "Maximum number of images for this resource was reached"})
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
router.put('/:id', requireAuth, validateReview, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const { review, stars } = req.body
    const userReview = await Review.findOne({
        where: {
            id: id
        }
    })

    if (notFound(userReview, res, 'Review')) return;
    if (notAuthorized(userReview, user, res)) return;

    await userReview.update({
        review: review,
        stars: stars
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
            id: id
        }
    })

    if (notFound(userReview, res, 'Review')) return;
    if (notAuthorized(userReview, user, res)) return;

    await userReview.destroy().then(() => res.json({message: 'Successfully deleted'}))
})

  module.exports = router;
