
const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    firstname: { type: String, require: true,},
    lastname: { type: String, require: true,},
    age: { type: Number, require: true,},
    username: { type: String, require: true,},
    password: { type: String, require: true,},
    birthday: { type: String, require: true,},
})


const User = model("user", userSchema);
module.exports = { User };

