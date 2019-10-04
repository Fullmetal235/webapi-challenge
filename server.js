const express = require('express')
const actionRouter = require('./data/helpers/actionRouter.js')
const projectRouter = require('./data/helpers/projectRouter.js')

const server = express()
server.use(express.json())
server.use('/api', actionRouter)
server.use('/api', projectRouter)

server.use('/', (req, res) => {
    res.send('You Found The Princess!');
});
module.exports = server 