import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User";
import IError from "../../Schema/IError";
import { secretString } from "../../constants";
import createError from "../../utils/createError";
import IResponseBody from "../../Schema/IResponseBody";

const login: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const { phoneNumber, password } = req.body;
        const user = await User.findOne({
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
        });

        if (!user) {
            throw createError("Phone Number not found", 400, [
                { path: "phoneNumber" },
            ]);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw createError("Invalid password", 401, [{ path: "password" }]);
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                userName: user.name,
                phoneNumber,
                userType: user.userType,
            },
            secretString,
            { expiresIn: "12h" }
        );

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Logged in successfully",
            token,
            user: { name: user.name, phoneNumber, userId: user._id.toString() },
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

export default login;
