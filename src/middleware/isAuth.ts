import { RequestHandler } from "express";
import IError from "../Schema/IError";
import jwt, { JwtPayload } from "jsonwebtoken";
import IRequest, { CurrentUser } from "../Schema/IRequest";

const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            const error: IError = new Error("Not Authorized");
            error.statusCode = 401;
            throw error;
        }
        const decodedToken = jwt.verify(token, "secretString") as JwtPayload;
        if (!decodedToken) {
            const error: IError = new Error("Not Authorized");
            error.statusCode = 401;
            throw error;
        }

        (req as IRequest).user = { ...(decodedToken as CurrentUser) };
        next();
    } catch (err) {
        if (!(err as IError).statusCode) {
            (err as IError).statusCode = 500;
        }
        next(err);
    }
};

export default isAuth;
