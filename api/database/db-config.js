const PouchDB = require('pouchdb')
// create local PouchDB server
const db = new PouchDB('http://localhost:5984/AGI100')

module.exports = db