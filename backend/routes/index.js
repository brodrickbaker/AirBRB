const express = require('express');
const router = express.Router();

// GET /api/restore-user
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

  const apiRouter = require('./api');

router.use('/api', apiRouter);

module.exports = router;
