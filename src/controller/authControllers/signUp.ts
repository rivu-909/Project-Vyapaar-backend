import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import User from "../../models/User";
import IError from "../../Schema/IError";
import bcrypt from "bcrypt";

const signUp: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: IError = new Error("Validation Failed");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { phoneNumber, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            phoneNumber,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({
            message: "User created successfully",
        });
    } catch (err) {
        if (!(err as IError).statusCode) {
            (err as IError).statusCode = 500;
        }
        next(err);
    }
};

export default signUp;
