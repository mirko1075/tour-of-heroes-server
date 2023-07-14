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
    async getList(options) {
        console.log('options', options)
        const data = await Heroes.find(options)
        return data
    }

    /**
     * Add a new hero item
     * @param {*} id The Id of Hero
     */
    async getHero(id) {
        const data = await Heroes.findOne({ _id: id })
        return data
    }

    async getHeroByName(name) {
        const data = await Heroes.findOne({ name: name })
        return data
    }

    /**
     * Delete a hero item
     * @param {*} id The Id of Hero
     */
    async deleteHero(id) {
        const data = await Heroes.findOneAndDelete({ _id: id })
        return data
    }

    /**
     * Add a new hero item
     * @param {*} name The name of the Hero
     * @param {*} description The description of the Hero
     * @param {*} imageUrl The imageUrl of the Hero
     * @param {*} powerstats The powerstats of the Hero
     */
    async addHero( name, description, imageUrl, powerstats) {
        const existentHero = await this.getHeroByName(name)
        if (existentHero) throw new Error('Name already present in DB')
        const data = await Heroes.create({
            name, description, imageUrl, powerstats 
        })
        return data
    }

    /**
     * Update a hero item
     * @param {*} heroId The Id of Hero
     * @param {*} details The details of the Hero
     */
    async putHero(heroId, { name, description, imageUrl, powerstats }) {
        if (name !== '' ) {
            const existentHero = await this.getHeroByName(name)
            if (existentHero && heroId !== existentHero.id) throw new Error('Name already present in DB')
        }
        else{
            throw new Error('Name is mandatory')
        }
        const data = await Heroes.findOneAndUpdate(
            { _id: heroId },
            { name, description, imageUrl, powerstats },
            {
                returnDocument: 'after',
            }
        )
        console.log('data', data)
        return data
    }
}

module.exports = HeroesService
