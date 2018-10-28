const client = require('../../app').client

module.exports.auth = (req, res, next) => { 
    if (req.isAuthenticated()) return next()
    else res.redirect('/poll');
}