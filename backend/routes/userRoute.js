import express from 'express'
import { registerUser, loginUser, fetchDetails, updateDetails, uploadImage, volunteerRequests, saveNgo, unsaveNgo, savedNgos } from '../controllers/userController.js';
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
userRouter.get("/volunteerRequests/:id", volunteerRequests);
userRouter.post("/saveNgo/:id", saveNgo);
userRouter.post("/unsaveNgo/:id", unsaveNgo);
userRouter.get("/savedNgos/:id", savedNgos);

export default userRouter;