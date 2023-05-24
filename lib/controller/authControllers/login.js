"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { phoneNumber, password } = req.body;
        const user = yield User_1.default.findOne({ phoneNumber });
        if (!user) {
            const error = new Error("A user with this phone number could not found");
            error.statusCode = 401;
            throw error;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Wrong password");
            error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id.toString(),
            userName: user.name,
            phoneNumber,
        }, "secretString", { expiresIn: "1h" });
        res.status(200).json({
            token,
            userId: user._id.toString,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.default = login;