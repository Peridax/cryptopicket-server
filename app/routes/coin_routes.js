const express = require('express')

// Coin & price models
const Coin = require('../models/coins')

// Handling errors
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// Middleware
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// Instantiating a router
const router = express.Router()
