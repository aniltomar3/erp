import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({path:"backend/config/config.env"});
import { connectDatabase } from "./config/dbConnect.js";
//console.log(process.env.PORT);
connectDatabase();
import demoRoutes from "./routes/demoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1',demoRoutes);
app.use('/api/v1',userRoutes);

app.listen(process.env.PORT,()=>{ console.log(`Connection successfull in port=${process.env.PORT}`); })
