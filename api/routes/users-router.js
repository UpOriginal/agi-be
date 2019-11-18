const router = require('express').Router()
const UsersModel = require('../models/users-model')

router.route('/')
    .get((req, res)=>{
     const users = UsersModel.getAllUsers()
     if(users){
         res.status(200).json({users})
     }else{
         res.status(500).json({message: "Unable to retrieve users"})
     }
    })
    .post((req,res)=>{
        const user = req.body
        const newUser = UsersModel.addUser(user)
        if(newUser){
            res.status(200).json({newUser})
        }else{
            res.status(500).json({message: "Unable to retrieve newUser"})
        }
    })

router.route('/:id')
    .get((req, res)=>{
        const { id }= req.params
        const newUser = UsersModel.findUser(id)
        if(newUser){
            res.status(200).json({newUser})
        }else{
            res.status(500).json({message: "Unable to retrieve newUser"})
        }
    })
    .post((req,res)=>{
        const { id }= req.params
        const newUser = UsersModel.findUser(id)
        if(newUser){
            res.status(200).json({newUser})
        }else{
            res.status(500).json({message: "Unable to retrieve newUser"})
        }
    })
    .delete((req,res)=>{
        const { id }= req.params
        const deletedUser = UsersModel.deleteUser(id)
        if(deletedUser){
            res.status(200).json({deletedUser})
        }else{
            res.status(500).json({message: "Unable to Delete newUser"})
        }
    })

module.exports = router