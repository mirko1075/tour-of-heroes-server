// eslint-disable-next-line no-unused-vars
const db = require('../config/db')

const Heroes = require('../models/hero.model')

/**
 * Logic for reading and writing Heroes data
 */
class HeroesService {
    /**
     * Get all Heroes items
     */
    async getList() {
        const data = await Heroes.find()
        return data
    }

    /**
     * Add a new hero item
     * @param {*} id The Id of Hero
     */
    async getHero(id) {
        const data = await Heroes.findOne({ id: id })
        return data
    }

    /**
     * Delete a hero item
     * @param {*} id The Id of Hero
     */
    async deleteHero(id) {
        const data = await Heroes.findOneAndDelete({ id: id })
        return data
    }

    /**
     * Add a new hero item
     * @param {*} id The Id of Hero
     * @param {*} name The name of the Hero
     */
    async addHero(id, name) {
        const existentHero = await this.getHero(id)
        if (existentHero) throw new Error('Id already present in DB')
        const data = await Heroes.create({
            id,
            name,
        })
        return data
    }

    /**
     * Update a hero item
     * @param {*} id The Id of Hero
     * @param {*} name The name of the Hero
     */
    async putHero(heroid, { id, name }) {
        if (id !== '' && id !== heroid) {
            const existentHero = await this.getHero(id)
            if (existentHero) throw new Error('Id already present in DB')
        }
        const data = await Heroes.findOneAndUpdate(
            { id: heroid },
            { id, name },
            {
                returnDocument: 'after',
            }
        )
        return data
    }
}

module.exports = HeroesService
