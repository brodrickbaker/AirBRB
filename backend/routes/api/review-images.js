const router = require('express').Router();
const { ReviewImage, Spot, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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

    if (!reviewImage) {
        return res.status(404).json({message: "Review Image couldn't be found"})
    } else if (user.id !== reviewImage.Review.userId) {
        return res.status(403).json({message: 'Forbidden'})
    } else {
        await reviewImage.destroy().then(()=> res.json({message: 'Successfully deleted'}))
    }
})

module.exports = router;
