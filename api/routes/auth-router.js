const router = require('express').Router()
const UsersModel = require('../models/users-model')
const Validator = require('../middleware/registerValidation')

router.route('/register')
    .post(Validator, async (req, res)=>{
        try {
            const user = req.body
            user['_id'] = new Date().toISOString()
            const new_user = await UsersModel.addUser(user)
            if(new_user){
                res.status(200).json(user)
            }else{
                res.status(500).json({message: "Registration Error"})
            }
        } catch (error) {
            console.log('Error', error.message)
        }
})

module.exports = router