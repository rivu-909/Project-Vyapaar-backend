import { Router } from "express";
import ablyAuth from "../controller/ablyAuthController/ablyAuth";
import isAuth from "../middleware/isAuth";

const router = Router();

router.use(isAuth);
router.get("/auth", ablyAuth);

export default router;
