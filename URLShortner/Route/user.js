import express from "express"
import { handleUserSignup, handleUserLogin} from "../Controllers/user.js";

const userRouter = express.Router();

userRouter.post("/", handleUserSignup)
userRouter.post("/login", handleUserLogin)

export {userRouter};