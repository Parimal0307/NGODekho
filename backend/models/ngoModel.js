import mongoose from "mongoose";

const NGOSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }, 
    category: { type: String, required: true}, //new
    location: { type: String, required: true },
    about: { type: String}, // was description
    volunteers_needed: {type: Boolean, default: false}, // new
    rating: {type: Number, default: 0}, // new
    reviews: {type: Number, default: 0}, // new
    ngoImage: {type: String}, // Ngo Image

    mission: { type: String, required: true }, // NGO's mission statement
    contact: {
        email: { type: String },
        phone: { type: String },
        website: { type: String }
    },
    programs: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],
    success_stories: [
        {
            title: { type: String },
            story: { type: String }
        }
    ],
    gallery: { type: [String], default: [] }, // Array of image URLs
},{minimize:false});

const ngoModel = mongoose.model("ngo", NGOSchema);
export default ngoModel;