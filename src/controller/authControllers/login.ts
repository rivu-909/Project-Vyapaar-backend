import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../../models/User";
import IError from "../../Schema/IError";
import jwt from "jsonwebtoken";

const login: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: IError = new Error("Validation Failed");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            const error: IError = new Error(
                "A user with this phone number could not found"
            );
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error: IError = new Error("Wrong password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                userName: user.name,
                phoneNumber,
            },
            "secretString",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            userId: user._id.toString,
        });
    } catch (err) {
        if (!(err as IError).statusCode) {
            (err as IError).statusCode = 500;
        }
        next(err);
    }
};

export default login;
