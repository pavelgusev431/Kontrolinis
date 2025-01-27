import express from "express";
import authRouter from "../routers/authRouter.js";
import authorRouter from "../routers/authorsRouter.js";
import bookRouter from "../routers/booksRouter.js";
import cookieParser from "cookie-parser";
import verifyJWT from "../middlewares/verifyJWT.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/authors", verifyJWT, authorRouter);
app.use("/books", verifyJWT, bookRouter);

export default app;