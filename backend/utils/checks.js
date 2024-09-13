const { handleValidationErrors } = require('./validation')
const { check } = require('express-validator')

// error handling for resource not found
const notFound = (resource, res, item) => {
    if(!resource) return res.status(404).json({message: `${item} couldn't be found`})
}

// spot validation
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
      .optional({values: 'falsy'})
      .isFloat({
        min: -90,
        max: 90
      })
      .withMessage('Latitude must be within -90 and 90'),
    check('lng')
      .optional({values: 'falsy'})
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
      .withMessage('Description is required')
      .isLength({ min: 30 })
      .withMessage('Description needs a minumum of 30 characters'),
    check('price')
      .isFloat({
        min: 1
      })
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];
// review validation
const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check('stars')
      .isInt({
        min: 1,
        max: 5
    })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
  ]
  
  // check if spot is booked
  const isBooked = async (spot, startDate, endDate, res) => {
      startDate = new Date(startDate)
      endDate = new Date(endDate)
      const startError = "Start date conflicts with an existing booking";
      const endError = "End date conflicts with an existing booking";
      const message = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {}
      }
      const bookings = await spot.getBookings();
      for (let i = 0; i < bookings.length; i++) {
          let booking = bookings[i]
          
          if(startDate >= booking.startDate && startDate <= booking.endDate) message.errors.startDate = startError
          if(endDate <= booking.endDate && endDate >= booking.startDate) message.errors.endDate = endError
          if(startDate < booking.startDate && endDate > booking.endDate) {
            message.errors.startDate = startError
            message.errors.endDate = endError
          }
          if(message.errors.startDate || message.errors.endDate) return res.status(403).json(message)
      }
  }
  
  // get preview image
  const preview = spot => {
    const images = spot.SpotImages
    if (images.length) { 
      for (let i = 0; i < images.length; i++) {
            if (images[i].preview) {
              return images[i].url
            }
        }
    } 
    return null
  }
  // authorized user check
const notAuthorized = (resource, user, res) => {
    if (resource.ownerId == user.id || resource.userId == user.id) return 
    else return res.status(403).json({message: 'Forbidden'})
}

  module.exports = {
    validateSpot,
    validateReview,
    isBooked,
    preview,
    notFound,
    notAuthorized
  };
  