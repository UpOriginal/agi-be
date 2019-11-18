require('dotenv').config()
const express = require('express')
const helmet  = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const AgentDocs = require('./api/routes/agent-docs')
// const StripeCheckout = require('./api/routes/stripe-checkout')
const UsersRouter = require('./api/routes/users-router')
const UsersAuthRouter = require('./api/routes/auth-router')
const Validator = require('./api/middleware/registerValidation')
const port = process.env.PORT || 4001
const server = express()

server.disable('x-powered-by')
server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

server.get('/', (req, res)=>{
    res.send('Welcome to AGI 100 backend.')
})

server.use('/api/docs', AgentDocs)
// server.use('/api/payments', StripeCheckout)
server.use('/api/users', UsersRouter)
server.use('/api/auth', UsersAuthRouter)
server.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
})
