const { Book } = require("../models/book.model");



const createBook = async (req, res) => {
    try {
        const {
            title,
            auther,
            page,
            price,
        } = req.body;
        const existingBook = await Book.findOne({ title });

        console.log(existingBook);

        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan Book mavjud.",
            });
        } else {
            const newBook = new Book({
                title,
                auther,
                page,
                price,
            });
            await newBook.save();
            return res.status(201).json({
                success: true,
                message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi.",
            });
        }
    } catch (error) {
        console.error("Xato:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi.",
        });
    }
};



const getBook = async (req, res) => {
    try {
        const Book = await Book.find({});
        res.json({
            success: true,
            message: "Barcha fo'ydalanuvchilar ro'yhati olingan",
            innerData: Book
        });
    } catch (error) {
        console.error("Error fetchning Book:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Fo'ydalanuvchi olishda xato yuz berdi"
        });

    }
};





const getBookById = async (req, res) => {
    try {
        const BookId = req.params.id;

        const Book = await Book.findById(BookId)

        if (!Book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book found", Book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const deleteBook = async (req, res) => {
    try {
        const deleteBookId = req.params.id; 

        const deleteBook = await Book.findOneAndDelete(deleteBookId)

        if (!deleteBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Delete Book", deleteBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateBook = async (req, res) => {
    try {
        const updateBookId = req.params.id;
        const { title, auther, page, price} = req.body

        const updateBook = await Book.findByIdAndUpdate(updateBookId,
            {
                title,
                auther,
                page,
                price,
            })

        if (!updateBook) {
            return res.status(404).json({ message: " Book not found  " });
        }

        res.json({ message: "Book updated successfully", updateBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createBook,
    getBook,
    getBookById,
    deleteBook,
    updateBook,
}