//Data Bases
const moongose = require('../services/service.db.mongo');
const initiSetupDB = require('../components/libs/initialSetup')

//Server
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const server = express()

//Middlewares
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded( {extended: true} ))

//Router
server.use("/api", require("./config.router"))

module.exports = server