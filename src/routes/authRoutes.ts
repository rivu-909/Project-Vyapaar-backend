import { Router } from "express";
import login from "../controller/authControllers/login";
import signUp from "../controller/authControllers/signUp";
import loginValidation from "../middleware/validation/loginValidation";
import signUpValidation from "../middleware/validation/signUpValidation";

const router = Router();

router.post("/signUp", signUpValidation, signUp);
router.post("/login", loginValidation, login);

export default router;
