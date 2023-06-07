import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import ITrade from "../../Schema/ITrade";
import createError from "../../utils/createError";

const createTrade: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            throw createError("Product with this id doesn't exists", 404);
        }

        const newTrade: ITrade = {
            ...req.body,
            userId: (req as IRequest).user.userId,
        };

        product.trades.push(newTrade);
        await product.save();

        const response: IResponseBody = {
            statusCode: 201,
            message: "Trade created",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
                trades: product.trades,
            },
        };

        res.status(201).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default createTrade;
