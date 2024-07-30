const router = require('express').Router();
const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { isBooked } = require('../../utils/validation');

// error handling for booking not found
const bookingError = (booking, res) => {
    if(!booking) {
        let err = new Error('Booking couldn\'t be found')
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

// update an existing booking
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    const { user } = req
    let { startDate, endDate } = req.body
    const booking = await Booking.findOne({
        where: {
            id: id
        }
    })
    if (bookingError(booking, res)) return;
    if (booking.userId !== user.id) return res.status(403).json({message: 'Forbidden'});
    if (new Date(booking.endDate) < new Date()) return res.status(403).json({message: "Past bookings can't be modified" })
    const spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    })

    if (await isBooked(spot, startDate, endDate, res)) return;

    try {
        await booking.update({
            spotId: spot.id,
            userId: user.id,
            startDate: startDate,
            endDate: endDate
        }).then(booking => res.json(booking))
    } catch (err) {
    res.status(400).json({ message: err.message })
    }
})

// delete a booking
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    const { user } = req
    const booking = await Booking.findOne({
        where: {
            id: id
        }, 
        include: {
            model: Spot
        }
    })
    if (bookingError(booking, res)) return;
    if (booking.userId !== user.id && booking.Spot.ownerId !== user.id) return res.status(403).json({message: 'Forbidden'}); 
    if (new Date(booking.startDate) < new Date()) return res.status(403).json({message: "Bookings that have been started can't be deleted" })
   
    await booking.destroy().then(() => res.json({message: 'Successfully deleted'}))
        
})

module.exports = router;
