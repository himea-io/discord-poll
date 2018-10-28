const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => User.findOne({id: id}).then((user) => done(null, user)))

passport.use(
    new DiscordStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ['identify']
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({id: profile.id}).then((user) =>  {
            if (!user)
                new User({
                    id: profile.id,
                    username: profile.username,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }).save().then(newUser => done(null, newUser))
            else
            {
                User.findOneAndDelete({id: profile.id}, {username: profile.username})
                .then((user) => done(null, user))
            }
        })
    })
)