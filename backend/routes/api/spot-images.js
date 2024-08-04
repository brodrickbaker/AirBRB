const router = require('express').Router();
const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { notAuthorized, notFound } = require('../../utils/checks');

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

    if (notFound(spotImage, res, 'Spot Image')) return
    if (notAuthorized(spotImage.Spot, user, res)) return 
  
    await spotImage.destroy().then(()=> res.json({message: 'Successfully deleted'}))
})

module.exports = router;
