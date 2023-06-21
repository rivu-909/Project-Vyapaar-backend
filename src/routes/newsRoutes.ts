import { Router } from "express";
import newsController from "../controller/newsController/newsController";
import isAuth from "../middleware/isAuth";

const router = Router();

router.use(isAuth);
router.get("/", newsController);

export default router;
