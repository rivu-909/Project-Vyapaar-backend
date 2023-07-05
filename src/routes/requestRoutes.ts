import { Router } from "express";
import createTradeRequest from "../controller/tradeRequestControllers/createTradeRequest";
import getUserTradeRequests from "../controller/tradeRequestControllers/getUserTradeRequests";
import respondToRequest from "../controller/tradeRequestControllers/respondToRequest";
import isAuth from "../middleware/isAuth";
import connectUser from "../controller/tradeRequestControllers/connectUser";

const router = Router();

router.use(isAuth);
router.get("/user/all", getUserTradeRequests);
router.get("/user/:tradeRequestId", connectUser);
router.post("/new/:productId/:tradeId", createTradeRequest);
router.put("/respond/:tradeRequestId", respondToRequest);

export default router;
