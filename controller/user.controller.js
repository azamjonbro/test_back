const { User } = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {    
    try {
        console.log(req?.body);
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                success: false,
                message: "Barcha maydonlar to'ldirilishi shart.",
            });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan User mavjud.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi.",
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Xato:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi.",
        });
    }
};



const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            success: true,
            message: "Barcha fo'ydalanuvchilar ro'yhati olingan",
            innerData: users
        });
    } catch (error) {
        console.error("Error fetchning users:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Fo'ydalanuvchi olishda xato yuz berdi"
        });

    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User found", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteUserId = req.params.id; 

        const deleteUser = await User.findOneAndDelete(deleteUserId)

        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Delete User", deleteUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateUser = async (req, res) => {
    try {
        const updateUserId = req.params.id;
        const {            
            firstname,
            lastname,
            age,
            username,
            password,
            birthday,
         } = req.body

        const updateUser = await User.findByIdAndUpdate(updateUserId,
            {
                firstname,
                lastname,
                age,
                username,
                password,
                birthday,
            })

        if (!updateUser) {
            return res.status(404).json({ message: " User not found  " });
        }

        res.json({ message: "User updated successfully", updateUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}



const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Username is invalid",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Username or password is invalid",
            });
        }

        const token = jwt.sign({ username: user.username }, "secret");
        return res.json({
            message: "Token",
            token: token,
            username,
            password,
        });



    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error: An erroroccurent during the login process "
        })
    }
}



module.exports  = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    userLogin,
}