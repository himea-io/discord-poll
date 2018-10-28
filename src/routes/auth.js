const express = require('express')
const router = express.Router()
const passport = require('passport')
const { auth } = require('../utils')

// set routes
router.get('/login', passport.authenticate('discord'))
router.get('/callback', passport.authenticate('discord'), (req, res) => res.redirect('/poll'))
router.get('/logout', auth, (req, res) => {
    req.logout()
    res.redirect('/poll')
})

module.exports.router = router