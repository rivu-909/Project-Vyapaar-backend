import { ErrorRequestHandler } from "express";
import IError from "../Schema/IError";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const statusCode = (error as IError).statusCode || 500;
    const message = error.message;
    const data = (error as IError).data;
    res.status(statusCode).json({ message, data });
};
export default errorHandler;
