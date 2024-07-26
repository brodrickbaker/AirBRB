const router = require('express').Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const spot = require('../../db/models/spot');
const { requireAuth, setTokenCookie } = require('../../utils/auth')

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

 // get all spots of current user with reviews and images
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    console.log(req)
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

//get spots by spot id
router.get('/:id', async (req, res, next)=> {
    const {id} = req.params
    let spot = await Spot.findOne({
        where: {
            id: id
        }, 
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
            },
            {
                model: User, as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    if(!spot) {
        let err = new Error('Spot couldn\'t be found')
        res.status(404)
        res.json({message: err.message})
    }
    
    const reviews = await spot.getReviews()
    const totalReviews = reviews.length
    const totalStars = reviews.reduce((acc, review) => {
        return acc + review.stars
    }, 0)
    const avg = totalStars/totalReviews 
    
    spot = spot.toJSON()
    spot.numReviews = totalReviews
    spot.avgStarRating = avg
    res.json(spot)
})

router.post('/', async (req, res) => {
 
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    await Spot.create(
        {
            ownerId: user.dataValues.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        }
    )

    const newSpot = await Spot.findAll(
        {   
            order: [['id','DESC']],
            limit: 1
        }
    )

    res.json(newSpot)
})

module.exports = router;
