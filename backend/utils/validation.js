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

// error handling for spot not found
const spotError = (spot, res) => {
  if(!spot) {
      let err = new Error('Spot couldn\'t be found')
      res.status(404)
      return res.json({message: err.message})
  }
}

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

module.exports = {
  handleValidationErrors,
  spotError,
  validReview
};
