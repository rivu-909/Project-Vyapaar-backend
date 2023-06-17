import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import ITrade from "../../Schema/ITrade";
import UserType from "../../Schema/UserType";
import createError from "../../utils/createError";

const updateTrade: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const productId = req.params.productId;
        const tradeId = req.params.tradeId;

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

        const trade = product.trades[tradeIndex];
        const populatedReq = req as IRequest;
        if (
            trade.userId.toString() !== populatedReq.user.userId.toString() &&
            populatedReq.user.userType !== UserType.admin
        ) {
            throw createError("User not authorized for the action", 401);
        }

        const updates: ITrade = req.body;
        trade.address = updates.address;
        trade.quantity = updates.quantity;
        trade.price = updates.price;

        product.trades.splice(tradeIndex, 1, trade);
        await product.save();

        const response: IResponseBody = {
            statusCode: 200,
            message: "Trade updated",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
                trades: product.trades,
            },
        };

        res.status(200).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default updateTrade;
