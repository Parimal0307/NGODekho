import express from 'express'
import { registerUser, loginUser, fetchDetails, updateDetails } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/fetchDetails/:id", fetchDetails);
userRouter.put("/updateDetails/:id", updateDetails)

export default userRouter;