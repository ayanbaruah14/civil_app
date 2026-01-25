import { Router } from "express";
import { Signup,login } from "../Controllers/auth_control.js";
import { loginValidation, signupValidation } from "../Middlewares/validation.js";

const router=Router();

router.post("/signup", signupValidation ,Signup);
router.post("/login",loginValidation ,login);

export default router;
