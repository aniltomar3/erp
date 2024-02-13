import User from "../models/user.js";
import sendToken from "../utils/assignToken.js";

export const registerUser= async(req,res)=>{
    const{name,email,password}= req.body;
    const user= await User.create({name,email,password});
   // const token= user.getJwtToken();  
    //res.status(200).json({token,message:"user registered successfully"});
    sendToken(user,200,res);
}

export const loginUser= async(req,res)=>{
   const {email,password}= req.body;
   if(!email || !password){
     res.status(400).json({message:"Please enter your username and password"});
   }
   const user= await User.findOne({email}).select("+password");
   if(!user){  res.status(400).json({message:"Invalid username or password"});  }
   const token= user.getJwtToken();  
  // res.status(200).json({token,message:"user login successfully"});
  sendToken(user,200,res);
}

export const logout= async(req,res)=>{
  res.cookie("token",null,{expires:new Date(Date.now()),httponly:true});
  res.status(200).json({message:"User Logout successfully"});
}

