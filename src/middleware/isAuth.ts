import { RequestHandler } from "express";
import IError from "../Schema/IError";
import jwt, { JwtPayload } from "jsonwebtoken";
import IRequest from "../Schema/IRequest";
import { secretString } from "../constants";
import createError from "../utils/createError";
import UserType from "../Schema/UserType";

interface CurrentUser {
    userId: string;
    name: string;
    phoneNumber: string;
    userType: UserType;
}

const authError = createError("User not authorized for the action", 401);

const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            throw createError("Token not provided", 401);
        }

        const decodedToken = jwt.verify(token, secretString) as JwtPayload;
        if (!decodedToken) {
            throw authError;
        }

        (req as IRequest).user = { ...(decodedToken as CurrentUser) };

        next();
    } catch (err) {
        if (!(err as IError).statusCode) {
            next(authError);
        } else {
            next(err);
        }
    }
};

export default isAuth;
