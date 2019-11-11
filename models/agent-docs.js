const db = require('../database/db-config')


module.exports = {
    addDocument,
    getDocuments,
    deleteDocument
}

function addDocument(document){
    return db.put(document)
}
function getDocuments(document){
    return db.allDocs({include_docs: true})
}

function deleteDocument(id){
    return db.remove(id)
}