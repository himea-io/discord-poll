const express = require('express')
const router = express.Router()
const { auth } = require('../utils')

// set routes
router.get('/', auth, (req, res) => {
    res.send(`Hey ${req.user.username}`)
})

module.exports.router = router