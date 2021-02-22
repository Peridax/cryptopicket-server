const express = require('express')
const passport = require('passport')

const errors = require('../../lib/custom_errors')

const handle404 = errors.handle404
const BadParamsError = errors.BadParamsError
const requireOwnership = errors.requireOwnership

const Watchlist = require('../models/watchlist')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Create a watchlist
router.post('/watchlists', requireToken, (req, res, next) => {
  Promise.resolve(req.body.watchlist)
    .then(watchlist => {
      if (!watchlist || !watchlist.title) {
        throw new BadParamsError()
      }

      return watchlist
    })
    .then(watchlist => {
      watchlist.owner = req.user._id
      return watchlist
    })
    .then(watchlist => Watchlist.create(watchlist))
    .then(watchlist => res.status(200).json({ watchlist }))
    .catch(next)
})

// Index watchlists
router.get('/watchlists', requireToken, (req, res, next) => {
  Watchlist.find({ owner: req.user._id })
    .then(handle404)
    .then(watchlists => res.status(201).json({ watchlists }))
    .catch(next)
})

// Show watchlist
router.get('/watchlist/:id', requireToken, (req, res, next) => {
  Watchlist.findById(req.params.id)
    .then(handle404)
    .then(watchlist => requireOwnership(req, watchlist))
    .then(watchlist => res.status(200).json({ watchlist }))
    .catch(next)
})

// Delete watchlist
router.delete('/watchlist/:id', requireToken, (req, res, next) => {
  Watchlist.findById(req.params.id)
    .then(handle404)
    .then(watchlist => {
      requireOwnership(req, watchlist)
      watchlist.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
