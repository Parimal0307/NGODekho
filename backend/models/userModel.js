import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    location: { type: String },                       
    phone: { type: String },                          
    dp: { type: String }, 
    savedNGOs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ngo', default: [] }]
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;