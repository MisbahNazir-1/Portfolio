import Cart from "../models/cartModel.js";

export const AddToCart = async (req, res) => {
    try {
        const { product_id, user_id, quantity } = req.body;

        let existingCartItem = await Cart.findOne({ user_id, product_id });

        if (existingCartItem) {
            existingCartItem.quantity += Number(quantity);
            await existingCartItem.save();
        } else {
            const newCartItem = new Cart({
                user_id,
                product_id,
                quantity
            });
            await newCartItem.save();
        }

        return res.json({
            status: true,
            message: "Product added to cart"
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Unable to add to cart !",
            error: err.message
        });
    }
};
