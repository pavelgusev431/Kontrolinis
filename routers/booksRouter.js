import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/booksController.js";
import express from "express";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooks).post(verifyAdmin, createBook);
bookRouter.route("/:id").get(getBookById).patch(verifyAdmin, updateBook).delete(verifyAdmin, deleteBook);

export default bookRouter;