const PouchDb = require('pouchdb')
// create local PouchDB server
const db = new PouchDb('http://localhost:5984/AGI100')
module.exports = db