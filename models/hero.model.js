const mongoose = require('mongoose')
const { Schema } = mongoose

const heroesSchema = new Schema(
    {
        id: String,
        name: String,
        description: String,
        imageUrl: String,
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
