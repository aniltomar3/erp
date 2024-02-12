import Product from "../models/product.js"

export const getDemoData= async(req,res)=>{
    res.status(200).json({
        message:"My first API DATA"
    });
};

export const getProducts= async(req,res)=>{
    const product= await Product.find();
    if(!product){
        res.status(400).json({error:'Product Not Found'});
     }
    res.status(200).json({product});
};
    export const newProduct= async(req,res)=>{
        const product= await Product.create(req.body);
        res.status(200).json({message:'Data inserted successfully'});
    };

    export const getProductDetails= async(req,res)=>{
         const product= await Product.findById(req.params.id);  
         if(!product){
            res.status(400).json({error:'Product Not Found'});
         }
         res.status(200).json({product});
     };

      export const updateProduct= async(req,res)=>{
        let product= await Product.findById(req.params.id);  
        if(!product){
            res.status(400).json({error:'Product Not Found'});
         }

         product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
         res.status(200).json({product});

      }

      export const deleteProduct= async(req,res)=>{
        let product= await Product.findById(req.params.id);  
        if(!product){
            res.status(400).json({error:'Product Not Found'});
         }

         product= await Product.deleteOne();
         res.status(200).json({mesage: "Product deleted"});

      }

      


