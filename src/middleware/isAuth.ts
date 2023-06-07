import { RequestHandler } from "express";
import IError from "../Schema/IError";
import jwt, { JwtPayload } from "jsonwebtoken";
import IRequest from "../Schema/IRequest";
import { secretString } from "../constants";
import createError from "../utils/createError";
import UserType from "../Schema/UserType";
import User from "../models/User";

interface CurrentUser {
    userId: string;
    name: string;
    phoneNumber: string;
    userType: UserType;
}

const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            throw createError("Token not provided", 401);
        }

        const decodedToken = jwt.verify(token, secretString) as JwtPayload;
        if (!decodedToken) {
            throw createError("User not authorized", 401);
        }
        const user = decodedToken as CurrentUser;
        (req as IRequest).user = user;

        const userData = await User.findById(user.userId);
        if (!userData) {
            throw createError("User not found", 404);
        }

        next();
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default isAuth;
