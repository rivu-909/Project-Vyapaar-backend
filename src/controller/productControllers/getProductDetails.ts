import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IResponseBody from "../../Schema/IResponseBody";
import createError from "../../utils/createError";

const getProductDetails: RequestHandler = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            throw createError("Product with this id doesn't exists", 404);
        }

        const response: IResponseBody = {
            statusCode: 200,
            message: "Fetched product details",
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

export default getProductDetails;
