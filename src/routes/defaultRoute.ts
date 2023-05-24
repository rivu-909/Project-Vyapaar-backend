import { Router } from "express";
import defaultController from "../controller/defaultController";

const router = Router();

router.get("/", defaultController);

export default router;
