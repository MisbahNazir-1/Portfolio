import express from "express";
import { GetAllProduct, AddProduct } from "../controller/productController.js";
const router = express.Router();

router.get("/", GetAllProduct);  
router.post("/", AddProduct);   
export default router;
