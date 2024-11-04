import path from "path";
import express from 'express'
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { app, server } from "./socket/socket.js";

dotenv.config({});

const __dirname = path.resolve();

// const app=express();
const PORT=process.env.PORT||8080;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser())
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOption)); 

//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute) 

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})