import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import VolunteerRequestModel from "../models/VolunteerRequestModel.js";

// creating json token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        // checking if the user already exists
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"});
        }

        // validate email and password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating user
        const newUser = new UserModel({username, email, password:hashedPassword});
        const user = await newUser.save();

        // generating token
        const token = createToken(user._id);
        res.json({success:true, token, userId:user._id});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email})

        // checking if user exists
        if(!user) {
            return res.json({success:false, message:"User doesn't exist"});
        }

        // compairing password 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success:false, message:"Invalid Credentials"});
        }

        const token = createToken(user._id);
        res.json({success:true, token, userId:user._id});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const fetchDetails = async (req, res) =>{
    const { id } = req.params;

    try {
        const userDetails = await UserModel.findById(id); // Corrected this line

        if (!userDetails) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: userDetails });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.json({ success: false, message: "Error retrieving User details" });
    }
}

const updateDetails = async (req, res) => {
    const {id} = req.params;
    const fieldsToUpdate = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $set: fieldsToUpdate },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ success: false, message: "Error updating details" });
    }
}

const uploadImage = async (req, res) => {
    const {id} = req.params;
    let image_name = `${req.file.filename}`;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {dp: image_name},
            {new: true}
        )

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating User details:", error);
        res.status(500).json({ success: false, message: "Error uploading image" });
    }
}

const volunteerRequests = async (req, res) => {
    const { id } = req.params;

    try {
        const requests = await VolunteerRequestModel.find({userId:id})
            .populate("ngoId", "name location ngoImage") 
            .sort({ appliedOn: -1 });

        res.json({ success: true, data: requests });
    } catch (err) {
        console.error("Error fetching volunteer requests:", err);
        res.status(500).json({ success: false, message: "Failed to fetch volunteer requests" });
    }
}

const saveNgo = async (req, res) => {
    const { id } = req.params;
    const {ngoId} = req.body;

    try {
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.savedNGOs.some(id => id.equals(ngoId))) {
            user.savedNGOs.push(ngoId);
            await user.save();
        }

        res.json({ success: true, message: "NGO saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const unsaveNgo = async (req, res) => {
    const { id } = req.params;
    const { ngoId } = req.body;

    try {
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.savedNGOs = user.savedNGOs.filter(savedId => savedId.toString() !== ngoId);
        await user.save();

        res.json({ success: true, message: "NGO unsaved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const savedNgos = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id).populate("savedNGOs", "name location ngoImage category");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, data: user.savedNGOs });
    } catch (error) {
        console.error("Error fetching saved NGOs:", error);
        res.status(500).json({ success: false, message: "Failed to fetch saved NGOs" });
    }
}

export {registerUser, loginUser, fetchDetails, updateDetails, uploadImage, volunteerRequests, saveNgo, unsaveNgo, savedNgos};