import { RequestHandler } from "express";
import path from "path";

const defaultController: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, "/../..", "/views/welcome.html"));
};

export default defaultController;
