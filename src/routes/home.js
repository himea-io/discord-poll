const express = require('express')
const router = express.Router()

// set routes
router.get('/', (req, res) => res.render('home', {auth: req.isAuthenticated(), user: req.user}))

module.exports.router = router