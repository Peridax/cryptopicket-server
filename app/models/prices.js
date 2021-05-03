const mongoose = require('mongoose')

const priceSchema = new mongoose.Schema({
  usd: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
})

module.exports = priceSchema
