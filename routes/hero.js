const express = require('express')
const createError = require('http-errors')
const { check, validationResult } = require('express-validator')
const router = express.Router()

module.exports = (params) => {
  const { heroService } = params
  // GET '/heroes' Get all heroes
  router.get('/', async (req, res, next) => {
    try {
      console.log('req.query', req.query)
      const options = JSON.parse(req.query.filter || null)
      const heroesList = await heroService.getList(options)
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
      const heroFound = await heroService.getHero(heroId)
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
      const heroFound = await heroService.deleteHero(heroId)
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
        .withMessage('A Name is required'),
    ],
    async (req, res, next) => {
      try {
        console.log('Put hero detail')
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.json({ errors: errors.array() })
        }
        const heroId = req.params.heroId
        const { name, description, imageUrl, powerstats } = req.body
        const heroFound = await heroService.putHero(heroId, {
          name,
          description,
          imageUrl,
          powerstats,
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
      check('name')
        .trim()
        .isLength({ min: 8, max: 50 })
        .escape()
        .withMessage('A name is required and must be longer than 8 Chars'),
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(500).json({ errors: errors.array() })
        }
        const { name, description, imageUrl, powerstats } = req.body
        const heroesList = await heroService.addHero(
          name,
          description,
          imageUrl,
          powerstats
        )
        if (heroesList) res.status(201).json(heroesList)
        else res.status(204).send('No data found')
      } catch (error) {
        next(createError(error))
      }
    }
  )
  return router
}
