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

        const users = await User.find({
            $or: [{ _id: senderId }, { _id: receiverId }],
        }).select({ name: 1, tradeRequests: 1 });

        const sender =
            users[0]._id.toString() === senderId ? users[0] : users[1];
        const receiver =
            users[0]._id.toString() === receiverId ? users[0] : users[1];

        const newTradeRequest = new TradeRequest({
            senderId,
            senderName: sender.name,
            receiverId,
            receiverName: receiver.name,
            tradeId,
            productId,
            status: RequestStatus.Pending,
        });

        if (sender) {
            sender.tradeRequests.sent.push(newTradeRequest._id);
        }

        if (receiver) {
            receiver.tradeRequests.received.push(newTradeRequest._id);
        }

        await Promise.all([
            newTradeRequest.save(),
            sender.save(),
            receiver.save(),
        ]);

        const responseBody: IResponseBody = {
            statusCode: 201,
            message: "Trade request created",
            tradeRequest: newTradeRequest,
        };

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
