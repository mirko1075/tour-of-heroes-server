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
     * @param {*} Id The Id of Hero
     */
    async getHero(Id) {
        const data = await Heroes.findOne({ Id: Id })
        return data
    }

    /**
     * Delete a hero item
     * @param {*} Id The Id of Hero
     */
    async deleteHero(Id) {
        const data = await Heroes.findOneAndDelete({ Id: Id })
        return data
    }

    /**
     * Add a new hero item
     * @param {*} Id The Id of Hero
     * @param {*} Name The Name of the Hero
     */
    async addHero(Id, Name) {
        const existentHero = await this.getHero(Id)
        if (existentHero) throw new Error('Id already present in DB')
        const data = await Heroes.create({
            Id,
            Name,
        })
        return data
    }

    /**
     * Update a hero item
     * @param {*} Id The Id of Hero
     * @param {*} Name The Name of the Hero
     */
    async putHero(heroId, { Id, Name }) {
        if (Id !== '' && Id !== heroId) {
            const existentHero = await this.getHero(Id)
            if (existentHero) throw new Error('Id already present in DB')
        }
        const data = await Heroes.findOneAndUpdate(
            { Id: heroId },
            { Id, Name },
            {
                returnDocument: 'after',
            }
        )
        return data
    }
}

module.exports = HeroesService
