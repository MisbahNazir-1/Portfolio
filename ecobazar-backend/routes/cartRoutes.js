import express from "express";
import { AddToCart } from "../controller/cartController.js";

const router = express.Router();

router.post("/", AddToCart);

export default router;
