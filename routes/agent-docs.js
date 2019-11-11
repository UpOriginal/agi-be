const router = require('express').Router()
const AgentDocsModel = require('../models/agent-docs')
const sendEnvelopeController = require('../DocuSign/envelope-controller')

router.get('/agent-docs', async (req, res)=>{
    // send documents
    sendEnvelopeController(req,res)
})

router.post('/add-doc', async (req, res)=>{
    try {
        const docs = await AgentDocsModel.addDocument(req.body)
        res.status(200).json({'docs': docs})
    } catch (error) {
        res.status(500).json({'message':"Unable to add document"})
    }
})

module.exports = router