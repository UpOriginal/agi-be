const Joi = require('@hapi/joi');

const UserSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(1)
        .max(20)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(1)
        .max(20)
        .required(),
    email: Joi.string()
        .email({minDomainSegments: 2, tlds:{allow: ['com', 'net']}})
        .required(),
    phoneNumber: Joi.string()
        .regex(/^\d{3}-\d{3}-\d{4}$/)
        .required(),
    address: Joi.object({
        street: Joi.string()
            .alphanum(),
        city: Joi.string()
            .alphanum(),
        state: Joi.string(),
        zipCode: Joi.number(),
        country: Joi.string()
            .required(),
    })
})

async function validateUser(req, res, next){
    try {
        const user = req.body;
        const results = await UserSchema.validateAsync(user)
        console.log('validator',results)
        next()
    } catch (error) {
        console.log('Validation Error', error)
        next(error.message)
    }
}
module.exports = validateUser