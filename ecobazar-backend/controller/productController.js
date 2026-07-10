import Product from "../models/productModel.js";

// 1. Sare Products Get Karne Ke Liye (GET)
export const GetAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            status: true,
            message: "Products Data !!!",
            products: products
        });
    } catch (err) {
        res.status(500).json({ status: false, message: "Unable to Fetch Products !!", error: err.message });
    }
};

// 2. Naya Product Save Karne Ke Liye (POST)
export const AddProduct = async (req, res) => {
    try {
        const { productname, actualprice, discountprice, image } = req.body;
        
        const newProduct = new Product({ productname, actualprice, discountprice, image });
        await newProduct.save();

        res.status(201).json({
            status: true,
            message: "Product Added Successfully !!! 🚀",
            product: newProduct
        });
    } catch (err) {
        res.status(500).json({ status: false, message: "Failed to Add Product !!", error: err.message });
    }
};
