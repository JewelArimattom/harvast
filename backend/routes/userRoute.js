import express from "express";
import { logintUser, registerUser, adminLogin, forgotPassword, resetPassword } from"../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", logintUser);
userRouter.post("/admin", adminLogin);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;