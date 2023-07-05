import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../Schema/IError";
import IResponseBody from "../../Schema/IResponseBody";
import createError from "../../utils/createError";

const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await Product.find();

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Fetched all products",
            products: products.map((product) => ({
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
                trades: product.trades,
                updatedAt: product.updatedAt,
            })),
        };

        res.status(200).json(responseBody);
    } catch (err) {
        const newError = createError((err as Error).message, 500);
        next(newError);
    }
};

export default getProducts;
