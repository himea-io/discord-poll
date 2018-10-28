const express = require('express')
const router = express.Router()

// set routes
router.get('/', (req, res) => res.send('hey there'))

module.exports.router = router