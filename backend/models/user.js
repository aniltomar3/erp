import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the name'],
        maxLength:[50,'Your name cant exceed 50 character']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please ente the password'],
    },
    role:{
        type:String,
        default:'user',
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
},{timestamps:true})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){ next(); }
    this.password= await bcrypt.hash(this.password,10); 
    });

    userSchema.methods.comparePassword= async function(postmanPassword){
        return await bcrypt.compare(postmanPassword,this.password);
    }

    userSchema.methods.getJwtToken= function(){
        return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME});
    }

export default mongoose.model("erpUser",userSchema);

