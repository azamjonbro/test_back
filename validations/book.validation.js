
const Joi = require("joi");

const bookValidationSchema = Joi.object({
    title: Joi.string().required().trim().min(3).max(50),
    auther: Joi.string().required(),
    page: Joi.string().required(),
    price: Joi.number().required(),
})

const updateBookValidationSchema = Joi.object({
    title: Joi.string().required().trim().min(5).max(50),
    auther: Joi.string().required(),
    page: Joi.string().required(),
    price: Joi.number().required(),
})


module.exports = {
    bookValidationSchema,
    updateBookValidationSchema,
}