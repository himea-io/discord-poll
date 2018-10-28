const Discord = require('discord.js')
const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const cors  = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
require('dotenv').config()
require('./src/config/passport-setup')

// setup express -
const app = express()
app.use(cors())
app.use(logger('dev'))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`,
 { useNewUrlParser: true }, console.log(`Connected to ${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`))

// setup the discord bot -
const client = new Discord.Client()
// trying to login to discord if fails kill the app
client.login(process.env.TOKEN).then(() => {
  // all routes prefixed by auth
  app.use('/poll/auth', require('./src/routes/auth').router)
  // all routes prefixed by panel
  app.use('/poll/panel', require('./src/routes/panel').router)
  // all routes prefixed by api/v1
  app.use('/poll/api/v1', require('./src/routes/v1').router)
}).catch((error) => {
  console.log(error)
  process.exit(1)
})
// send a message on login
client.on('ready', () => console.log(`Discord bot started\n`))

module.exports.app = app
module.exports.client = client