require('dotenv').config()
const express = require('express')
const helmet  = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const AgentDocs = require('./routes/agent-docs')
const port = process.env.PORT || 4000
const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

server.get('/', (req, res)=>{
    res.send('Welcome to AGI 100 backend.')
})

server.use('/api/docs', AgentDocs)

server.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
})
