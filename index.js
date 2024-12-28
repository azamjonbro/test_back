
const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Database connection
async function connectToDB() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
    }
}
connectToDB();


//Routes

const { Book } = require("./routes/book.rout");
app.use("/book", Book);
const { User } = require("./routes/user.rout");
app.use("/user", User);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})


