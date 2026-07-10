import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    actualprice: { type: Number, required: true },
    discountprice: { type: Number, default: 0 },
    image: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
