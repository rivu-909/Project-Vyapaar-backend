import { RequestHandler } from "express";
import TradeRequest from "../../models/TradeRequest";
import User from "../../models/User";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import RequestStatus from "../../Schema/RequestStatus";
import createError from "../../utils/createError";

const connectUser: RequestHandler = async (req, res, next) => {
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

        const users = await User.find({
            $or: [{ _id: senderId }, { _id: receiverId }],
        }).select({ name: 1, phoneNumber: 1, connections: 1 });

        const addConnection = async (i: number, j: number) => {
            const connection = users[i].connections.find(
                (c) => c._id.toString() === users[j]._id.toString()
            );
            if (!connection) {
                users[i].connections.push(users[j]);
                await users[i].save();
            }
        };
        let requestedUser;
        if (users[0]._id.toString() === userId) {
            requestedUser = users[1];
            await addConnection(0, 1);
        } else {
            requestedUser = users[0];
            await addConnection(1, 0);
        }

        if (tradeRequest.status !== RequestStatus.Accepted) {
            throw createError("Request is not confirmed", 401);
        }

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Fetched requested user sharable details",
            connection: {
                userId: requestedUser?._id.toString() ?? "",
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

export default connectUser;
