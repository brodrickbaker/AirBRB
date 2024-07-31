const router = require('express').Router();
const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// delete an image for a spot
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    const { user } = req
    const spotImage = await SpotImage.findOne({
        where: {
            id: id
        }, 
        include: {
            model: Spot
        }
    })

    if (!spotImage) {
        return res.status(404).json({message: "Spot Image couldn't be found"})
    } else if (user.id !== spotImage.Spot.ownerId) {
        return res.status(403).json({message: 'Forbidden'})
    } else {
        await spotImage.destroy().then(()=> res.json({message: 'Successfully deleted'}))
    }
})

module.exports = router;
