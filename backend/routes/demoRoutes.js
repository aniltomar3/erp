import express from "express";
const router = express.Router();
import { getDemoData,getProducts,newProduct ,getProductDetails,updateProduct,deleteProduct} from "../controllers/demoController.js";
import { isAuthenticatedUser,authorizeRoles } from "../middlewares/auth.js";


router.route("/demo").get(getDemoData);
router.route("/products").get(isAuthenticatedUser,authorizeRoles('admin','superadmin'),getProducts); // show all products
router.route("/admin/products").post(isAuthenticatedUser,newProduct);  // Inset product in DB
router.route("/admin/getproducts/:id").get(getProductDetails); 
router.route("/admin/updateProducts/:id").put(updateProduct); 
router.route("/admin/deleteProducts/:id").delete(isAuthenticatedUser,deleteProduct);  



export default router;