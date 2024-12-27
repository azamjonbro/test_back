
const Joi = require("joi");

const userValidationSchema = Joi.object({
    firstname: Joi.string().min(3).max(50),
    lastname: Joi.string().required(),
    age: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    birthday: Joi.string(),
})

const updateUserValidationSchema = Joi.object({
    firstname: Joi.string().trim().min(5).max(50),
    lastname: Joi.string().required(),
    age: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    birthday: Joi.string(),
})


module.exports = {
    userValidationSchema,
    updateUserValidationSchema,
}