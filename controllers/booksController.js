import Book from "../models/booksModel.js";
import Author from "../models/authorsModel.js";

const getAllBooks = async (req, res) => {
    let books = await Book.findAll();
    console.log(req.query);
    const { page, limit, title, author } = req.query;
    const offset = (page - 1) * limit;
    const offsettedLimit = parseInt(offset) + parseInt(limit);
    if (books) {
        if (page && limit && offset && offsettedLimit) books = books.slice(offset, offsettedLimit).dataValues;
        books = await Promise.all(books.map(async (book) => {
            const author = await Author.findOne({ where: { id: book.dataValues.authorId } });
            return { ...book.dataValues, authorId: undefined, author: author.dataValues };
        }));
        if(title) {
            const regexp = new RegExp(title, 'i');
            books = books.filter((book) => regexp.test(book.title));
        }
        if(author) {
            // const regexp = new RegExp(author, 'i');
            // books = books.filter((book) => regexp.test(book.authorId));
            books.filter((book) => book.authorId === parseInt(author));
        }
        res.status(200).json({
            status: "success",
            data: books,
        });
        return;
    } else {
        res.status(404).json({
            status: "fail",
            message: "No books found."
        })
    }
}

const getBookById = async (req, res) => {
    const { id } = req.params;
    const foundBook = await Book.findOne({ where: { id: id } });
    if (foundBook) {
        const author = await Author.findOne({ where: { id: foundBook.authorId } });
        res.status(200).json({
            status: "success",
            data: { ...foundBook.dataValues, authorId: undefined, author: author },
        });
        return;
    } else {
        res.status(404).json({
            status: "fail",
            message: "Invalid id.",
        });
    }
}

const createBook = async (req, res) => {
    const book = req.body;
    const foundBook = await Book.findOne({ where: { isbn: book.isbn } });
    if (foundBook) {
        res.status(403).json({
            status: "fail",
            message: "This book already exists.",
        });
        return;
    } else {
        try {
            const newBook = await Book.create({
                title: book.title,
                summary: book.summary,
                isbn: book.isbn,
                authorId: book.authorId,
            });
            res.status(201).json({
                status: "success",
                data: newBook,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: "Invalid author id.",
            })
        }

    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const newBook = req.body;
    const foundBook = await Book.findOne({ where: { id: id } });
    if (foundBook) {
        try {
            await Book.update({
                ...newBook,
            }, { where: { id: id }, });
            return res.status(201).json({
                status: "success",
                data: {
                    ...foundBook.dataValues,
                    ...newBook,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "error",
                message: error.message,
            })
        }

    } else {
        res.status(404).json({
            status: "fail",
            message: `Book with id ${id} not found`,
        });
    }
    return;
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const foundUser = await Book.findOne({ where: { id: id } });
    if (foundUser) {
        await Book.destroy({ where: { id: id } });
        return res.status(204).send();
    } else {
        res.status(404).json({
            status: "fail",
            message: `Book with id ${id} not found`,
        });
    }
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };