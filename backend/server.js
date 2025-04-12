import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import ngoRouter from "./routes/ngoRoute.js"
import userRouter from "./routes/userRoute.js"
import volunteerRouter from "./routes/volunteerRoute.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB();

// api endpoints
app.use("/api/ngo", ngoRouter);
app.use("/api/user", userRouter);
app.use("/api/volunteer", volunteerRouter);
app.use("/images", express.static('uploads'));

app.get("/", (req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`);
})