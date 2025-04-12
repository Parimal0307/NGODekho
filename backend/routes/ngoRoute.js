import express from "express"
import { loginNgo, registerNgo, listNgo, fetchDetails, updateDetails, uploadImage, uploadGallery, showRequests, updateRequest } from "../controllers/ngoController.js"
import multer from 'multer'
    
const ngoRouter = express.Router()

// Image storage engine
const storage = multer.diskStorage({
    destination:'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

// middleware
const upload = multer({storage:storage});

ngoRouter.post("/register", registerNgo); // NGO register
ngoRouter.post("/login", loginNgo); // NGO login
ngoRouter.get("/list", listNgo); // List all the registered NGOs
ngoRouter.post("/fetchdetails", fetchDetails); // Fetch details of an NGO
ngoRouter.put("/updatedetails/:id", updateDetails); // Update details of an NGO
ngoRouter.put("/uploadimage/:id", upload.single('image'), uploadImage); // upload ngo image
ngoRouter.put("/uploadgallery/:id", upload.array("images", 10), uploadGallery) // upload gallery
ngoRouter.get("/requests/:ngoId", showRequests); // List all the requests
ngoRouter.put("/updaterequest", updateRequest); // update requests

export default ngoRouter;