import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IProduct from "../../Schema/IProduct";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import createError from "../../utils/createError";

const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const productBody: IProduct = {
            ...req.body,
            userId: (req as IRequest).user.userId,
        };

        const product = new Product(productBody);
        await product.save();

        const responseBody: IResponseBody = {
            statusCode: 201,
            message: " Product created",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
            },
        };

        res.status(201).json(responseBody);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default createProduct;
