import { RequestHandler } from "express";
import Product from "../../models/Product";
import TradeRequest from "../../models/TradeRequest";
import User from "../../models/User";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import RequestStatus from "../../Schema/RequestStatus";
import createError from "../../utils/createError";

const getTradeRequestUserDetails: RequestHandler = async (req, res, next) => {
    try {
        const tradeRequestId = req.params.tradeRequestId;
        const tradeRequest = await TradeRequest.findById(tradeRequestId);

        if (!tradeRequest) {
            throw createError("Trade request with this id doesn't exists", 404);
        }

        const userId = (req as IRequest).user.userId;
        const receiverId = tradeRequest.receiverId.toString();
        const senderId = tradeRequest.senderId.toString();
        if (userId !== senderId && userId !== receiverId) {
            throw createError("User not authorized for the action", 401);
        }

        let requestedUser;
        if (userId === receiverId) {
            requestedUser = await User.findById(senderId, {
                name: 1,
                phoneNumber: 1,
            });
        } else {
            requestedUser = await User.findById(receiverId, {
                name: 1,
                phoneNumber: 1,
            });
        }

        if (tradeRequest.status !== RequestStatus.Accepted) {
            throw createError("Request is not confirmed", 401);
        }

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Fetched requested user sharable details",
            user: {
                name: requestedUser?.name ?? "",
                phoneNumber: requestedUser?.phoneNumber ?? "",
            },
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

export default getTradeRequestUserDetails;
