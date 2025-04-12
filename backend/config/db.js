import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://parimalmourya03:iRwuOwFSjfwjThNW@cluster0.hj6w3.mongodb.net/ngo-app").then(()=>console.log("DB Connected"));
}