import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const isAuthenticatedUser= async(req,res,next)=>{
    const {token}= req.cookies;
    if(!token){ res.status(400).json({error:"Login first to access the products."})}

    const decode= jwt.verify(token,process.env.JWT_SECRET);
    req.user= await User.findById(decode.id);
    next();
}


export const authorizeRoles=(...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(res.status(401).json({error:`Role ${req.user.role} is not allowed to access this product`}));
    }
    next();
  }

}