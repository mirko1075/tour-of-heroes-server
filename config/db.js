const mongoose = require('mongoose')
require('dotenv').config()

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,

        useUnifiedTopology: true,
    })
    .then(() => {
        console.info('Successfully connected to the mongodb database')
    })
    .catch((err) => {
        console.info('Could not connect to the database. Exiting now...', err)
        process.exit()
    })
