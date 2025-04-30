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

userRouter.post("/register", registerUser); // Register a user
userRouter.post("/login", loginUser); // Login user
userRouter.get("/fetchDetails/:id", fetchDetails); // fetch user details
userRouter.put("/updateDetails/:id", updateDetails); // update user details
userRouter.put("/uploadImage/:id", upload.single('image'), uploadImage); // upload user profile picture
userRouter.get("/volunteerRequests/:id", volunteerRequests); // List all the volunteer requests made by the user
userRouter.post("/saveNgo/:id", saveNgo); // save an ngo to profile
userRouter.post("/unsaveNgo/:id", unsaveNgo); // unsave an ngo
userRouter.get("/savedNgos/:id", savedNgos); // list all the saved ngos

export default userRouter;