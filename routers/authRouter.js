import {registerUser, loginUser} from "../controllers/authController.js";
import express from "express";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);

export default authRouter;