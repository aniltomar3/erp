import user from "../models/user.js";
import User from "../models/user.js";
import sendToken from "../utils/assignToken.js";
import sendEmail from "../utils/senEmail.js";

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

export const forgotPassword= async(req,res,next)=>{
  const user= await User.findOne({email:req.body.email});
  if(!user){ res.end(400).json({message:"Not a valid USer"}); }
  const resetToken= user.getResetPasswordToken();
  console.log(resetToken);
  await user.save();
  const resetUrl= `http://localhost:8000/api/v1/password/reset/${resetToken}`;
  const message= `Your rest password token is as follow:\n\n ${resetUrl}\n\n If you have not requested the email please ignore it.`;

try{
  await sendEmail({
     email:'aniltomar3@gmail.com',
     subject:"ERP password Recovery",
     message,
  });
  res.status(200).json({message:"Mail sent successfully"});
}catch(error){
  user.resetPasswordToken= undefined;
  user.resetPasswordExpire=undefined;
  user.save();
   return next(res.status(400).json({message:error.message}));
}

} // forgot password ends here

export const logout= async(req,res)=>{
  res.cookie("token",null,{expires:new Date(Date.now()),httponly:true});
  res.status(200).json({message:"User Logout successfully"});
}

