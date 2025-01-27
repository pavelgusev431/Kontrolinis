import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from "../controllers/authorsController.js"
import express from "express";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const authorRouter = express.Router();

authorRouter.route("/").get(getAllAuthors).post(verifyAdmin, createAuthor);
authorRouter.route("/:id").get(getAuthorById).patch(verifyAdmin, updateAuthor).delete(verifyAdmin, deleteAuthor);

export default authorRouter;