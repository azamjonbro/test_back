const { Router } = require("express");
const User = Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    userLogin,

} = require("../controller/user.controller");

const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    userValidationSchema,
    updateUserValidationSchema,

} = require("../validations/user.validation");


User.post("/createUser", validateSchema(userValidationSchema), createUser);
User.get("/getUsers", getUsers);
User.get("/getUserById/:id", getUserById);
User.put("/updateUser/:id", validateSchema(updateUserValidationSchema),updateUser);
User.delete("deleteUser/:id",  deleteUser);
User.post("/userLogin",  userLogin);


module.exports = {
    User
}