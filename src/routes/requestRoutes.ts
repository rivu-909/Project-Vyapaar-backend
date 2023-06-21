import { Router } from "express";
import createTradeRequest from "../controller/tradeRequestControllers/createTradeRequest";
import getTradeRequestUserDetails from "../controller/tradeRequestControllers/getTradeRequestUserDetails";
import getUserTradeRequests from "../controller/tradeRequestControllers/getUserTradeRequests";
import respondToRequest from "../controller/tradeRequestControllers/respondToRequest";
import isAuth from "../middleware/isAuth";

const router = Router();

router.use(isAuth);
router.get("/user/all", getUserTradeRequests);
router.get("/user/:tradeRequestId", getTradeRequestUserDetails);
router.post("/new/:productId/:tradeId", createTradeRequest);
router.put("/respond/:tradeRequestId", respondToRequest);

export default router;
