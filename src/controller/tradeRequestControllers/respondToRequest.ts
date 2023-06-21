import { RequestHandler } from "express";
import TradeRequest from "../../models/TradeRequest";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import createError from "../../utils/createError";

const respondToRequest: RequestHandler = async (req, res, next) => {
    try {
        const tradeRequestId = req.params.tradeRequestId;
        const tradeRequest = await TradeRequest.findById(tradeRequestId);

        if (!tradeRequest) {
            throw createError("Trade request with this id doesn't exists", 404);
        }

        const userId = (req as IRequest).user.userId;

        if (userId !== tradeRequest.receiverId.toString()) {
            throw createError("User not authorized for the action", 401);
        }

        const updatedStatus = req.body.updatedStatus;

        tradeRequest.status = updatedStatus;
        await tradeRequest.save();

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Trade request status updated",
            tradeRequest,
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

export default respondToRequest;
