import { RequestHandler } from "express";
import TradeRequest from "../../models/TradeRequest";
import User from "../../models/User";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import RequestStatus from "../../Schema/RequestStatus";
import createError from "../../utils/createError";

const createTradeRequest: RequestHandler = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const tradeId = req.params.tradeId;
        const receiverId = req.body.receiverId;
        const senderId = (req as IRequest).user.userId;

        const newTradeRequest = new TradeRequest({
            senderId,
            receiverId,
            tradeId,
            productId,
            status: RequestStatus.Pending,
        });

        await newTradeRequest.save();

        const responseBody: IResponseBody = {
            statusCode: 201,
            message: "Trade request created",
            tradeRequest: newTradeRequest,
        };

        const sender = await User.findById(senderId);
        if (sender) {
            sender.tradeRequests.sent.push(newTradeRequest._id);
            await sender.save();
        }

        const receiver = await User.findById(receiverId);
        if (receiver) {
            receiver.tradeRequests.received.push(newTradeRequest._id);
            await receiver.save();
        }
        res.send(responseBody);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default createTradeRequest;
