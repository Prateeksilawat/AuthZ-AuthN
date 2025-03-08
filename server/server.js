import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port  = process.env.PORT || 4000;
connectDB();

// Update allowedOrigins for both local and Vercel
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://auth-z-auth-n.vercel.app' // Vercel deployment URL
];

app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// API endpoints
app.get('/', (req, res) => res.send("API Working fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server started on Port:${port}`));
