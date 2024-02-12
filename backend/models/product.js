import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the Product Name']
    },
    price:{
        type:Number,
        required:[true,'Please enter Product price'],
        maxLength:[5,'Product price cannot exceed 5 character']
    },
    description:{
        type:String,
        required:[true,'Please enter product description']
    },
    images:[],
    category:{
        type:String,
        required:[true,'Please enter product category'],
        enum:{values:['full','half','Quarter','strong','lite'],message:['Please enter correct category']},
    },
    seller:{
        type:String,
        required:[true,'Please enter product seller name']
    },
    stock:{
        type:Number,
        required:[true,'Please enter product stock'],
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

});

export default mongoose.model("Product",productSchema);