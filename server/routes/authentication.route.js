import express from "express";
import { register, login, logout } from "../controllers/authentication.controller.js";
import { registerValidation, loginValidation } from "../middleware/authvalidation.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);

router.post("/logout", logout);

export default router;
