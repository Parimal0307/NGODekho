import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// creating json token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

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
        const newUser = new UserModel({name, email, password:hashedPassword});
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

export {registerUser, loginUser};