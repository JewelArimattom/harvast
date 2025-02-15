import express from "express";
import { logintUser, registerUser, adminLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", logintUser);
userRouter.post("/admin", adminLogin);

export default userRouter;