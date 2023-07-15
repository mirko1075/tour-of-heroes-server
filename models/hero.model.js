const mongoose = require('mongoose')
const { Schema } = mongoose

const heroesSchema = new Schema(
  {
    name: String,
    description: String,
    imageUrl: String,
    powerstats: {
      intelligence: Number,
      strength: Number,
      speed: Number,
      durability: Number,
      power: Number,
      combat: Number,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Heroes = mongoose.model('heroes', heroesSchema)

module.exports = Heroes
