import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port  = process.env.PORT || 4000
connectDB()

const allowedOrigins = ['https://auth-z-auth-n.vercel.app']


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins ,credentials:true}))

//api endpoints
app.get('/',(req,res) => res.send("Api Working fine"));
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port,()=> console.log(`Server start on Port:${port}`)); 
