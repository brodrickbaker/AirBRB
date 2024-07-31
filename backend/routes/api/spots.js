const router = require('express').Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors, validReview, isBooked,  } = require('../../utils/validation');


// authorized user check
const isAuthorized = (spot, user, res) => {
    if (spot.ownerId !== user.id) return res.status(403).json({message: 'Forbidden'})
}


// error handling for spot not found
const spotError = (spot, res) => {
    if(!spot) {
        let err = new Error('Spot couldn\'t be found')
        res.status(404)
        return res.json({message: err.message})
    }
  }
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

//get spot by spot id
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

    if (spotError(spot, res)) return;
    
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

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({checkFalsy: true})
      .withMessage('State is required'),
    check('country')
      .exists({checkFalsy: true})
      .withMessage('Country is required'),
    check('lat')
      .isFloat({
        min: -90,
        max: 90
      })
      .withMessage('Latitude must be within -90 and 90'),
    check('lng')
      .isFloat({
        min: -180,
        max: 180
      })
      .withMessage('Longitude must be within -180 and 180'),
    check('name')
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .isFloat({
        min: 1
      })
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];
// create new spot for current user
router.post('/', requireAuth, validateSpot, async (req, res) => {
 
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

    await Spot.findAll(
        {   
            order: [['id','DESC']],
            limit: 1
        }
    ).then(spot => res.json(...spot)) 
})
// add an image to a spot by id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { user } = req
    const { spotId } = req.params
    const { url, preview } = req.body
    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    if (spotError(spot, res)) return;
    if (isAuthorized(spot, user, res)) return;

    await SpotImage.create({
        spotId: spot.id,
        url: url,
        preview: preview
    })

    await SpotImage.findAll(
        {   
            attributes: ['id', 'url', 'preview'],
            order: [['id','DESC']],
            limit: 1
        }
    ).then(image => res.json(...image))  
})
// edit a spot by id
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    let spot = await Spot.findOne({
            where: {
                id: id              
            }
        })

    if (spotError(spot, res)) return;
    if (isAuthorized(spot, user, res)) return;

    await spot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price,
        updatedAt: new Date
    })

    await Spot.findOne({
        where: {
            id: id
        }
    }).then(spot => res.json(spot))
})
// delete a spot by id
router.delete('/:id', requireAuth, async (req, res) => {
    const { user } = req
    const { id } = req.params
    
    let spot = await Spot.findOne({
        where: {
            id: id
        }
    })

    if (spotError(spot, res)) return;
    if (isAuthorized(spot, user, res)) return;

    await spot.destroy()

    res.json({"message": "Successfully deleted"})
})

// get reviews by a spots id
router.get('/:id/reviews', async (req, res) => {
    const { id } = req.params
    
    let spot = await Spot.findOne({
        where: {
            id: id
        }
    })

    if (spotError(spot, res)) return;

    await Review.findAll({
        where: {
            spotId: spot.id
        },
        include: [
            { 
                model: User,
                attributes: ["id", "firstName", "lastName"]
             },
            { 
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    }).then(reviews => res.json({"Reviews": reviews}))

})

// Create a review for a spot based on spot's id
router.post('/:id/reviews', requireAuth, validReview, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const { review, stars } = req.body

    let spot = await Spot.findOne({
        where: {
            id: id
        }
    })

   if (spotError(spot, res)) return;
    
   const reviewed = await Review.findOne({
        where:{
            spotId: id,
            userId: user.id
        }
    }) 
        if(reviewed) {
          return res.status(403).json({message: "User already has a review for this spot"})
        } else {
            await Review.create({
                spotId: id,
                userId: user.id,
                review: review,
                stars: stars
            })
        
            await Review.findAll({
                order: [['id', 'DESC']],
                limit: 1
            }).then(review => res.json(...review))
        }
  })

// return all bookings based on spot id
router.get('/:id/bookings', requireAuth, async (req, res) => {
    const { id } = req.params
    const { user } = req
    const spot  = await Spot.findOne({
        where: {
            id: id
        }
    })

    if (spotError(spot, res)) return;

    let bookings;
    if (spot.ownerId == user.id) {
       bookings = await spot.getBookings({
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
       }) 
    } else {
        bookings = await spot.getBookings({
            attributes: ['spotId', 'startDate', 'endDate']
        })
    }

    return res.json({'Bookings': bookings})
})

// create a new booking based on spot id
router.post('/:id/bookings', requireAuth, async (req, res) => {
    const { id } = req.params
    const { user } = req
    let { startDate, endDate } = req.body
    const spot = await Spot.findOne({
        where: {
            id: id
        }
    })

    if(spotError(spot, res)) return;
    if (spot.ownerId == user.id) return res.status(403).json({message: 'Forbidden'})

    if (await isBooked(spot, startDate, endDate, res)) return;

    try {
        await Booking.create({
            spotId: id,
            userId: user.id,
            startDate: startDate,
            endDate: endDate
        }).then(booking => res.json(booking))
    } catch (err) {
    res.status(400).json({ message: err.message })
    }
})

module.exports = router;
