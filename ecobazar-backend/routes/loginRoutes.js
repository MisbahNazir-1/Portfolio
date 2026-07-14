import express from "express";
import { GetAllLogin, GetUserRegistered } from "../controller/loginController.js";

const router = express.Router();

router.post("/", GetAllLogin);
router.post("/", GetUserRegistered);

export default router;
