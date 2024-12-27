const { Schema, model } = require("mongoose");


const bookSchema = new Schema({
    title: { type: String, require: true,},
    auther: { type: String, require: true,},
    page: { type: String, require: true,},
    price: { type: Number, require: true,},
})


const Book = model("book", bookSchema);
module.exports = { Book };

