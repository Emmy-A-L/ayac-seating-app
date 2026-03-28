import express from 'express';
import dbConnection from './db/conn.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import youthRoutes from './routes/youthRoutes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const PORT = 4100
// const jwtsecret = process.env.JWT_SECRET

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // replace with your frontend URL
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}


dbConnection()
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/youthinfo", youthRoutes)

app.get("/", (req, res)=>{
    res.send("Welcome to my app")
})



app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})