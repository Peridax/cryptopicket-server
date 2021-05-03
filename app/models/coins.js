const mongoose = require('mongoose')
const priceSchema = require('./prices')

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  prices: [priceSchema],
  marketcap: [priceSchema]
})

module.exports = mongoose.Model('Coin', coinSchema)
