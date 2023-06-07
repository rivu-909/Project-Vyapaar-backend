import { Router } from "express";
import createTrade from "../controller/tradeControllers/createTrade";
import updateTrade from "../controller/tradeControllers/updateTrade";
import deleteTrade from "../controller/tradeControllers/deleteTrade";
import isAuth from "../middleware/isAuth";
import tradeValidation from "../middleware/validation/tradeValidation";

const router = Router();

router.use(isAuth);
router.post("/new/:productId", tradeValidation, createTrade);
router.put("/update/:productId/:tradeId", tradeValidation, updateTrade);
router.delete("/delete/:productId/:tradeId", deleteTrade);

export default router;
