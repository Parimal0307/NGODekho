import express from 'express'
import { registerUser, loginUser, fetchDetails, updateDetails, uploadImage } from '../controllers/userController.js';
import multer from 'multer'

const userRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination:'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

// middleware
const upload = multer({storage:storage});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/fetchDetails/:id", fetchDetails);
userRouter.put("/updateDetails/:id", updateDetails);
userRouter.put("/uploadImage/:id", upload.single('image'), uploadImage);

export default userRouter;