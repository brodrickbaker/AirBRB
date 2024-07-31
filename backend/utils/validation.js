const { validationResult, check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

// review validation
const validReview = [
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

    if (startDate.toString() == endDate.toString()) {
      message.message = 'Booking must be at least 1 day'
      message.errors.startDate = startError
      message.errors.endDate = endError
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

module.exports = {
  handleValidationErrors,
  validReview,
  isBooked
};
