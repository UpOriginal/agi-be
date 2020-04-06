const router = require("express").Router();
const sendEnvelopeController = require("../controllers/agentDocsController");

router.get("/agent-docs", (req, res) => {
  // send documents
  sendEnvelopeController(req, res);
});

module.exports = router;
