import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IRequest from "../../Schema/IRequest";
import IResponseBody from "../../Schema/IResponseBody";
import UserType from "../../Schema/UserType";
import createError from "../../utils/createError";

const deleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
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

        await product.deleteOne();

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Product deleted",
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

export default deleteProduct;
