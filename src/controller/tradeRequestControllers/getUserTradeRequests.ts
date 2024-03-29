import { RequestHandler } from "express";
import User from "../../models/User";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import ITradeRequest from "../../Schema/ITradeRequest";
import createError from "../../utils/createError";

const getUserTradeRequests: RequestHandler = async (req, res, next) => {
    try {
        const userId = (req as IRequest).user.userId;
        const user = await User.findById(userId, {
            tradeRequests: 1,
            connections: 1,
        })
            .populate<{
                tradeRequests: {
                    sent: Array<ITradeRequest>;
                    received: Array<ITradeRequest>;
                };
            }>("tradeRequests.received tradeRequests.sent")
            .orFail();

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Fetched trade requests",
            userTradeRequest: user.tradeRequests,
            connections: user.connections.map((c) => ({
                userId: c._id.toString(),
                phoneNumber: c.phoneNumber,
                name: c.name,
            })),
        };

        res.status(200).json(responseBody);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default getUserTradeRequests;
