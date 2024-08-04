const router = require('express').Router();
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { notAuthorized, notFound } = require('../../utils/checks');

// delete an image for a review
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    const { user } = req
    const reviewImage = await ReviewImage.findOne({
        where: {
            id: id
        }, 
        include: {
            model: Review
        }
    })

    if (notFound(reviewImage, res, 'Review Image')) return 
    if (notAuthorized(reviewImage.Review, user, res)) return 

    await reviewImage.destroy().then(()=> res.json({message: 'Successfully deleted'}))
})

module.exports = router;
