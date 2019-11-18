const PouchDB = require("pouchdb")

const db = new PouchDB('http://localhost:5984/UsersDB')

async function getAllUsers(){
    try {
        const users = await db.allDocs({include_docs: true, descending: true})
        console.log(users)
        if(users){
            return users
        }else{
            console.log('Trouble fetching users')
        }
    } catch (error) {
        console.log("Error Fetching All Users")
    }
}
async function findUser(id){
    try {
        const user = await db.get(id)
        console.log(user)
        if(user){
            return user
        }else{
            console.log('Trouble fetching user')
        }
    } catch (error) {
        console.log("Error Finding User")
    }
}
async function addUser(doc){
    try {
        const users = await db.put(doc)
        console.log(users)
        if(users){
            return users
        }else{
            console.log('Trouble fetching users')
        }
    } catch (error) {
        console.log("Error Adding User")
    }
}
function addUser(doc){
    const users = db.put(doc)
    if(users){
        console.log('user model',users)
        return users
    }else{
        console.log("Error Adding User")
        return false
    }
}
async function updateUser(doc){
    try {
        const user = await db.put(doc)
        console.log(user)
        if(user){
            return user
        }else{
            console.log('Trouble Updating user')
        }
    } catch (error) {
        console.log("Error Updating User")
    }
}

async function deleteUser(id){
    try {
        const user = await db.remove(id)
        console.log(user)
        if(user){
            return user
        }else{
            console.log('Trouble Deleting user')
        }
    } catch (error) {
        console.log("Error Deleting User")
    }
}
module.exports = {
    getAllUsers,
    findUser,
    deleteUser,
    addUser,
    updateUser
}
