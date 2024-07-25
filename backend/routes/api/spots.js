const router = require('express').Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const spot = require('../../db/models/spot');
const { requireAuth, restoreUser } = require('../../utils/auth')

// find avg rating
const getAvg = spots => {
    return spots.forEach(spot => {
      const reviews = spot.Reviews 
      const totalStars = reviews.reduce((acc, review) => {
        return acc + review.stars
    }, 0)
      const avg = totalStars/reviews.length
      spot.avgRating = avg
    })
    }

 // get all spots with reviews and images
router.get('/', async (_req, res) => {
   
    const allSpots = await Spot.findAll(
        {
            include: [
                {model: Review},
                {model: SpotImage}
            ]
        }
    );
    
    getAvg(allSpots)
    // construct response
    const craftedSpots = allSpots.map(spot => {
        if (spot.SpotImages.length !== 0) spot.previewImage = spot.SpotImages[0].url
        let payload = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.avgRating,
            previewImage: spot.previewImage 
        }
        return payload
    })
    res.json({'Spots': craftedSpots})
})

router.use(restoreUser)
router.use(requireAuth)

 // get all spots of curtrent user with reviews and images
router.get('/current', async (req, res) => {
    const { user } = req
    const userSpots = await Spot.findAll({
        where: {
            ownerId: user.id,
        }, 
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    })
    getAvg(userSpots)

    const craftedSpots = userSpots.map(spot => {
        if (spot.SpotImages.length !== 0) spot.previewImage = spot.SpotImages[0].url
        let payload = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.avgRating,
            previewImage: spot.previewImage 
        }
        return payload
    })
    res.json({'Spots': craftedSpots})
})

router.get('/:id', async (req, res)=> {
    const {id} = req.params
    const spot = await Spot.findOne({
        where: {
            id: id
        }, 
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User, as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    const reviews = await spot.getReviews()
    const totalReviews = reviews.length
    const totalStars = reviews.reduce((acc, review) => {
        return acc + review.stars
    }, 0)
    const avg = totalStars/totalReviews 
    spot.numReviews = totalReviews
    spot.avgStarRating = avg
    console.log(spot)
    res.json(spot)

})


module.exports = router;
