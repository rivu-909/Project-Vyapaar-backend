import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import UserType from "../../Schema/UserType";
import createError from "../../utils/createError";

const deleteTrade: RequestHandler = async (req, res, next) => {
    try {
        const tradeId = req.params.tradeId;
        const productId = req.params.productId;

        const product = await Product.findById(productId);
        if (!product) {
            throw createError("Product with this id doesn't exists", 404);
        }

        const tradeIndex = product.trades.findIndex(
            (trade) => trade._id.toString() === tradeId
        );
        if (tradeIndex === -1) {
            throw createError("Trade with this id doesn't exists", 404);
        }

        const populatedReq = req as IRequest;
        if (
            product.trades[tradeIndex].userId.toString() !==
                populatedReq.user.userId &&
            populatedReq.user.userType !== UserType.admin
        ) {
            throw createError("User not authorized for the action", 401);
        }

        product.trades.splice(tradeIndex, 1);
        await product.save();

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Trade deleted",
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

export default deleteTrade;
