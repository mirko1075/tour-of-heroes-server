const express = require('express')
const createError = require('http-errors')
const { check, validationResult } = require('express-validator')
const router = express.Router()


module.exports = (params) => {
    const { heroService } = params
    // GET '/heroes' Get all heroes
    router.get('/', async (req, res, next) => {
        try {
            console.log('Get heroes list')
            const heroesList = await heroService.getList()
            if (heroesList) res.status(200).json(heroesList)
            else res.status(204).send('No data found')
        } catch (error) {
            next(createError(error))
        }
    })

    // GET '/heroes/:heroId' Get all heroes
    router.get('/:heroId', async (req, res, next) => {
        try {
            console.log('Get hero detail')
            const heroId = req.params.heroId
            const heroFound = await heroService.gethero(heroId)
            if (heroFound) res.status(200).json(heroFound)
            else res.status(204).send('No data found')
        } catch (error) {
            next(createError(error))
        }
    })

    // GET '/heroes/:heroId' Get all heroes
    router.delete('/:heroId', async (req, res, next) => {
        try {
            console.log('Get hero detail')
            const heroId = req.params.heroId
            const heroFound = await heroService.deletehero(heroId)
            if (heroFound) res.status(200).json(heroFound)
            else res.status(204).send('No data found')
        } catch (error) {
            next(createError(error))
        }
    })

    // PUT '/heroes/:heroId' Get hero by heroId
    router.put(
        '/:heroId',
        [
            check('name')
                .trim()
                .isLength({ min: 8, max: 50 })
                .escape()
                .withMessage('A Id is required'),
        ],
        async (req, res, next) => {
            try {
                console.log('Put hero detail')
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.json({ errors: errors.array() })
                }
                const heroId = req.params.heroId
                const { Id, name } = req.body
                const heroFound = await heroService.puthero(heroId, {
                    Id,
                    name,
                })
                if (heroFound) res.status(200).json(heroFound)
                else res.status(204).send('No data found')
            } catch (error) {
                next(createError(error))
            }
        }
    )

    // POST '/heroes' Create hero
    router.post(
        '/',
        [
            check('id')
                .trim()
                .isLength({ min: 2, max: 4 })
                .escape()
                .withMessage('A Id is required'),
            check('name')
                .trim()
                .isLength({ min: 8, max: 50 })
                .escape()
                .withMessage('A name is required'),
        ],
        async (req, res, next) => {
            try {
                console.log('Add hero')
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.status(500).json({ errors: errors.array() })
                }
                const { Id, name } = req.body
                const heroesList = await heroService.addhero(Id, name)
                if (heroesList) res.status(201).json(heroesList)
                else res.status(204).send('No data found')
            } catch (error) {
                next(createError(error))
            }
        }
    )
    return router
}
