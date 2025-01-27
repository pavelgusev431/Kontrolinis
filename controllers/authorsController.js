import Author from "../models/authorsModel.js";
import Book from "../models/booksModel.js";

const getAllAuthors = async (_req, res) => {
    let authors = await Author.findAll();
    if (authors) {
        authors = await Promise.all(authors.map(async (author) => {
            const books = await Book.findAll({ where: { authorId: author.dataValues.id } });
            return { ...author.dataValues, books: books };
        }));
        res.status(200).json({
            status: "success",
            data: authors,
        });
        return;
    } else {
        res.status(404).json({
            status: "fail",
            message: "No authors found."
        })
    }
}

const getAuthorById = async (req, res) => {
    const { id } = req.params;
    const foundAuthor = await Author.findOne({ where: { id: id } });
    if (foundAuthor) {
        const books = await Book.findAll({ where: { authorId: foundAuthor.dataValues.id } });
        res.status(200).json({
            status: "success",
            data: {...foundAuthor.dataValues, books: books},
        });
        return;
    } else {
        res.status(404).json({
            status: "fail",
            message: "Invalid id.",
        });
    }
}

const createAuthor = async (req, res) => {
    const author = req.body;
    const foundAuthor = await Author.findOne({ where: { name: author.name } });
    if (foundAuthor) {
        res.status(403).json({
            status: "fail",
            message: "This author already exists.",
        });
        return;
    } else {
        const newAuthor = await Author.create({
            name: author.name,
            birthDate: author.birthDate,
            biography: author.biography,
        });
        res.status(201).json({
            status: "success",
            data: newAuthor,
        });
    }
}

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const newAuthor = req.body;
    const foundAuthor = await Author.findOne({ where: { id: id } });
    if (foundAuthor) {
        try {
            await Author.update({
                ...newAuthor,
            }, { where: { id: id }, });
            return res.status(201).json({
                status: "success",
                data: {
                    ...foundAuthor.dataValues,
                    ...newAuthor,
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
            message: `Author with id ${id} not found`,
        });
    }
    return;
}

const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    const foundUser = await Author.findOne({ where: { id: id } });
    if (foundUser) {
        await Author.destroy({ where: { id: id } });
        return res.status(204).send();
    } else {
        res.status(404).json({
            status: "fail",
            message: `Author with id ${id} not found`,
        });
    }
}

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };