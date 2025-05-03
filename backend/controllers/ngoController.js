import ngoModel from "../models/ngoModel.js";
import VolunteerRequestModel from "../models/VolunteerRequestModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import fs from 'fs'

// creating json token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register ngo
const registerNgo = async (req, res) => {
    const {name, email, password, category, location, mission} = req.body;

    try {
        // checking if the user already exists
        const exists = await ngoModel.findOne({email});
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

        // creating ngo
        const newNgo = new ngoModel({name, email, password:hashedPassword, category, location, mission});

        const ngo = await newNgo.save();

        // generating token
        const token = createToken(ngo._id);
        res.json({success:true, token, id:ngo._id});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// login ngo
const loginNgo = async (req, res) => {
    const {email, password} = req.body;

    try {
        const ngo = await ngoModel.findOne({email})

        // checking if user exists
        if(!ngo) {
            return res.json({success:false, message:"User doesn't exist"});
        }

        // compairing password 
        const isMatch = await bcrypt.compare(password, ngo.password);
        if(!isMatch) {
            return res.json({success:false, message:"Invalid Credentials"});
        }

        const token = createToken(ngo._id);
        res.json({success:true, token, id:ngo._id});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// list NGOs
const listNgo = async (req, res) => {
    try {
        const ngos = await ngoModel.find({});
        res.json({success:true, data:ngos});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// fetch details of a particular ngo using its ID
const fetchDetails = async (req, res) => {
    const { id } = req.body;
    // return res.json({id: id});

    try {
        const ngoDetail = await ngoModel.findById(id); // Corrected this line

        if (!ngoDetail) {
            return res.json({ success: false, message: "NGO not found" });
        }

        res.json({ success: true, data: ngoDetail });
    } catch (error) {
        console.error("Error fetching NGO:", error);
        res.json({ success: false, message: "Error retrieving NGO details" });
    }
}

// Update specific details
const updateDetails = async (req, res) => {
    const {id} = req.params;
    const fieldsToUpdate = req.body;

    try {
        const updatedNgo = await ngoModel.findByIdAndUpdate(
            id,
            { $set: fieldsToUpdate },
            { new: true }
        );

        if (!updatedNgo) {
            return res.status(404).json({ success: false, message: "NGO not found" });
        }

        res.json({ success: true, data: updatedNgo, message:"Details updated" });
    } catch (error) {
        console.error("Error updating NGO details:", error);
        res.status(500).json({ success: false, message: "Error updating details" });
    }
}

// upload ngo's display image
const uploadImage = async (req, res) => {
    const {id} = req.params;
    let image_name = `${req.file.filename}`;

    try {
        const updatedNgo = await ngoModel.findByIdAndUpdate(
            id,
            {ngoImage: image_name},
            {new: true}
        )

        if (!updatedNgo) {
            return res.status(404).json({ success: false, message: "NGO not found" });
        }

        res.json({ success: true, data: updatedNgo, message:"Image uploaded" });
    } catch (error) {
        console.error("Error updating NGO details:", error);
        res.status(500).json({ success: false, message: "Error uploading image" });
    }
}

// upload gallery (image of volunteers)
const uploadGallery = async (req, res) => {
    const { id } = req.params;
    const imageNames = req.files.map(file => file.filename); // Get file names

    try {
        const updatedNgo = await ngoModel.findByIdAndUpdate(
            id,
            { $push: { gallery: { $each: imageNames } } }, // Append new images
            { new: true }
        );

        if (!updatedNgo) {
            return res.status(404).json({ success: false, message: "NGO not found" });
        }

        res.json({ success: true, data: updatedNgo, message:"Gallery uploaded" });
    } catch (error) {
        console.error("Error updating NGO gallery:", error);
        res.status(500).json({ success: false, message: "Error uploading images" });
    }
}

// display all the requests
const showRequests = async (req, res) => {
    const { ngoId } = req.params;

    try {
        const requests = await VolunteerRequestModel.find({ ngoId })
        .populate('userId', 'username email')
        .sort({ appliedOn: -1 });

        res.json({ success: true, data: requests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching requests' });
    }
}

// update requests
const updateRequest = async (req, res) => {
    const { requestId, status } = req.body; // status = 'Approved' or 'Rejected'

    try {
        await VolunteerRequestModel.findByIdAndUpdate(requestId, { status });
        res.json({ success: true, message: `Request ${status.toLowerCase()}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating request status' });
    }
}

export {registerNgo, loginNgo, listNgo, fetchDetails, updateDetails, uploadImage, uploadGallery, showRequests, updateRequest};