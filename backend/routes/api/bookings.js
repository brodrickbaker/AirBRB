const router = require('express').Router();
const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

// error handling for booking not found
const bookingError = (booking, res) => {
    if(!booking) {
        let err = new Error('Spot couldn\'t be found')
        res.status(404)
        return res.json({message: err.message})
    }
  }
// get all bookings from current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    let bookings = await user.getBookings(
        {
            include: 
            {
                model: Spot,
                include: {
                    model: SpotImage
                }
            }
        })

    bookings = bookings.map(booking => {
        const spot = booking.Spot;
        bookingPayload = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                price: spot.price,
                previewImage: spot.SpotImages[0].url
            },
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
        return bookingPayload
    })
    return res.json({'Bookings': bookings})
})


module.exports = router;
