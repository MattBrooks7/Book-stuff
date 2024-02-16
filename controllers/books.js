const Book = require('../models/books')

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getBookById = async (req, res) => {
    const {id} = req.params
    try {
        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({message: 'Book not found'})
        }
        res.json(book)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const createBook = async (req, res) => {
    const {title, author, publishedDate} = req.body
    try {
        const book = new Book({title, author, publishedDate})
        await book.save()
        res.status(201).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateBook = async (req, res) => {
    const {id} = req.params
    const {title, author, publishedDate} = req.body
    try {
        const book = await Book.findByIdAndUpdate(
            id,
            {title, author, publishedDate},
            {new: true}
        )
        if (!book) {
            return res.status(404).json({message: 'Workout not found'})
        }
        res.json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteBook = async (req, res) => {
    const {id} = req.params
    try {
        const book = await Book.findByIdAndDelete(id)
        if (!book) {
            return res.status(404).json({message: 'Book not found'})
        }
        res.json(book)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
}