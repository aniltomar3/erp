import mongoose from "mongoose";

export const connectDatabase= ()=>{
    let DB_URI= process.env.DB_LOCAL_URL;
    mongoose.connect(DB_URI).then((con)=>{ console.log(`Database connected `); })
}

