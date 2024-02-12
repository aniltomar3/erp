import express from "express";
const router = express.Router();
import { getDemoData,getProducts,newProduct ,getProductDetails,updateProduct,deleteProduct} from "../controllers/demoController.js";


router.route("/demo").get(getDemoData);
router.route("/products").get(getProducts); // show all products
router.route("/admin/products").post(newProduct);  // Inset product in DB
router.route("/admin/getproducts/:id").get(getProductDetails); 
router.route("/admin/updateProducts/:id").put(updateProduct); 
router.route("/admin/deleteProducts/:id").delete(deleteProduct);  



export default router;