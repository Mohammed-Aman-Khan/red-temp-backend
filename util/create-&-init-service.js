const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

module.exports = () => {

    const ExpressService = express()

    ExpressService.use(cors())
    ExpressService.use(helmet())
    ExpressService.use(compression())
    ExpressService.use(express.json())

    return ExpressService

}