import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IProduct from "../../Schema/IProduct";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import UserType from "../../Schema/UserType";
import createError from "../../utils/createError";

// NOT USED BY CLIENT

const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const productId = req.params.productId;
        let product = await Product.findById(productId);
        if (!product) {
            throw createError("Product with this id doesn't exists", 404);
        }

        const populatedReq = req as IRequest;
        if (
            product.userId.toString() !== populatedReq.user.userId &&
            populatedReq.user.userType !== UserType.admin
        ) {
            throw createError("User not authorized for the action", 401);
        }

        const updates: IProduct = req.body;
        product.description = updates.description;
        product.price = updates.price;
        product.name = updates.name;

        await product.save();

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: " Product updated",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
                trades: product.trades,
                updatedAt: product.updatedAt,
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

export default updateProduct;
