import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User";
import IError from "../../Schema/IError";
import { secretString } from "../../constants";
import createError from "../../utils/createError";
import IResponseBody from "../../Schema/IResponseBody";
import UserType from "../../Schema/UserType";

const signUp: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }
        const { phoneNumber, name, password, gstin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
            password: hashedPassword,
            gstin,
            userType: UserType.consumer,
        });

        await user.save();

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                userName: user.name,
                phoneNumber,
                userType: UserType.consumer,
            },
            secretString,
            { expiresIn: "12h" }
        );

        const response: IResponseBody = {
            statusCode: 201,
            message: "User created successfully",
            token,
            user: { name, phoneNumber, userId: user._id.toString() },
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

export default signUp;
