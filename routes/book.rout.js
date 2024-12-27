const { Router } = require("express");
const Book = Router();

const {
    createBook,
    getBook,
    getBookById,
    deleteBook,
    updateBook,

} = require("../controller/book.controller");

const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    bookValidationSchema,
    updateBookValidationSchema,

} = require("../validations/book.validation");


Book.post("/createBook", validateSchema(bookValidationSchema), createBook);
Book.get("/getBook", getBook);
Book.get("/getBookById/:id", getBookById);
Book.put("/updateBook/:id", validateSchema(updateBookValidationSchema), updateBook);
Book.delete("deleteBook/:id",  deleteBook);


module.exports = {
    Book
}