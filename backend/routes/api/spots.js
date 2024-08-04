const router = require('express').Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { validateSpot, validateReview, isBooked, preview, notFound, notAuthorized } = require('../../utils/checks')
const { Op } = require('sequelize');

//find a spot by id
const getSpot = async id => {
   return await Spot.findOne({
        where: {
            id: id
        }
    })
}

// find avg star rating for a spot
const avgRating = spot => {
    const reviews = spot.Reviews 
    const totalStars = reviews.reduce((acc, review) => {
        return acc + review.stars
    }, 0)
    return totalStars/reviews.length
}

// construct response for get all spots
const craftedSpots = spots => {
    return spots.map(spot => {
        return {
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
            avgRating: avgRating(spot),
            previewImage: preview(spot) 
        }
    })
}

 // get all spots with reviews and images
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    const where = {}   
    const setParams = (min, max, attr) => {
        if (min && max) {
            where[attr] = { 
                [Op.and]: {
                    [Op.gt]: min,
                    [Op.lt]: max
                }
            }
        } else if (min) {
            where[attr] = { [Op.gt]: min }
        } else if (max) {
            where[attr] = { [Op.lt]: max }
        }
        return
    }
    
    setParams(minLat, maxLat, 'lat');
    setParams(minLng, maxLng, 'lng');
    setParams(minPrice, maxPrice, 'price')

    page = !page ? 1 : parseInt(page)
    size = !size || size > 20 ? 20 : parseInt(size)
 
    const allSpots = await Spot.findAll({
            where: where,
            include: [
                { model: Review },
                { model: SpotImage }
            ],
            limit: size,
            offset: size * (page - 1)
        });
    
    return res.json({
        'Spots': craftedSpots(allSpots),
        'page': page,
        'size': size
    })
})

 // get all spots of current user with reviews and images
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const userSpots = await Spot.findAll({
        where: {
            ownerId: user.id,
        }, 
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    })

    return res.json({'Spots': craftedSpots(userSpots)})
})

//get spot by spot id
router.get('/:id', async (req, res)=> {
    const { id } = req.params
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
            }, { model: Review }
        ]
    })

    if (notFound(spot, res, 'Spot')) return;
    
    spot = spot.toJSON()
    spot.numReviews = spot.Reviews.length
    spot.avgStarRating = avgRating(spot)
    delete spot.Reviews
    return res.json(spot)
})

// create new spot for current user
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    
    await Spot.create(
        {
            ownerId: user.id,
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
    const spot = await getSpot(spotId)

    if (notFound(spot, res, 'Spot')) return;
    if (notAuthorized(spot, user, res)) return;

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

    const spot = await getSpot(id)

    if (notFound(spot, res, 'Spot')) return;
    if (notAuthorized(spot, user, res)) return;

    await spot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    await getSpot(id).then(spot => res.json(spot))
})

// delete a spot by id
router.delete('/:id', requireAuth, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const spot = await getSpot(id)

    if (notFound(spot, res, 'Spot')) return;
    if (notAuthorized(spot, user, res)) return;

    await spot.destroy().then(() => res.json({"message": "Successfully deleted"})) 
})

// get reviews by a spots id
router.get('/:id/reviews', async (req, res) => {
    const { id } = req.params  
    const spot = await getSpot(id)

    if (notFound(spot, res, 'Spot')) return;

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
router.post('/:id/reviews', requireAuth, validateReview, async (req, res) => {
    const { user } = req
    const { id } = req.params
    const { review, stars } = req.body
    const spot = await getSpot(id)

    if (notFound(spot, res, 'Spot')) return;
    
    const reviewed = await Review.findOne({
        where:{
            spotId: spot.id,
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
    const spot  = await getSpot(id)

    if (notFound(spot, res, 'Spot')) return;

    const bookings = spot.ownerId == user.id ? await spot.getBookings({
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    }) : await spot.getBookings({
            attributes: ['spotId', 'startDate', 'endDate']
        })
    
    return res.json({'Bookings': bookings})
})

// create a new booking based on spot id
router.post('/:id/bookings', requireAuth, async (req, res) => {
    const { id } = req.params
    const { user } = req
    let { startDate, endDate } = req.body
    const spot = await getSpot(id)

    if (notFound(spot, res, 'Spot')) return;
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
