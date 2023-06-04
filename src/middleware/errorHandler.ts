import { ErrorRequestHandler } from "express";
import IError from "../Schema/IError";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.statusCode).json(error);
};
export default errorHandler;
