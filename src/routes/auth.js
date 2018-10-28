const express = require('express')
const router = express.Router()
const passport = require('passport')
const { auth } = require('../utils')

// set routes
router.get('/login', passport.authenticate('discord'))
router.get('/callback', passport.authenticate('discord'), (req, res) => res.redirect('/panel'));
router.get('/logout', auth, (req, res) => res.send('logout'))

module.exports.router = router