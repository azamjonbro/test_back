
const Joi = require("joi");

const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string(),
})

const updateUserValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string(),
})


module.exports = {
    userValidationSchema,
    updateUserValidationSchema,
}